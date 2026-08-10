# syntax=docker/dockerfile:1

# Nota de esta máquina: `docker build` necesita `--network=host`. La capa
# NAT por defecto de Docker Desktop en este entorno deja las descargas del
# registro de npm a 4-48 KiB/s hasta que el timeout las corta; con
# --network=host bajan a velocidad normal. No hace falta en el servidor,
# que tiene una red de datacenter real — es una particularidad de esta
# máquina de desarrollo, documentada acá para no perder tiempo
# rediagnosticándola.

# ---------- deps: instala dependencias en su propia capa ----------
# Separada del build para que un cambio de código no invalide el cache de
# `pnpm install`, que es la parte lenta.
FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
# Cache mount: si un intento se corta a mitad de camino, el siguiente no
# vuelve a descargar lo que ya bajó.
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile

# ---------- builder: compila con output standalone ----------
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ---------- runner: solo lo que hace falta para correr ----------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Usuario sin privilegios, como el resto de las apps del servidor.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# El output standalone no incluye public/ ni .next/static por diseño del
# propio Next.js: hay que copiarlos a mano.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Sin curl/wget en la imagen: el chequeo usa el Node que ya está ahí.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
