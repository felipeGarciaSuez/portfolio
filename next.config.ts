import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  /**
   * Salida standalone: el contenedor de producción se lleva solo el server
   * y las dependencias que realmente usa, en vez de todo node_modules.
   */
  output: "standalone",
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
