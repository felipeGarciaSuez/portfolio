import React from 'react'
import './Header.css'
import CTA from './CTA'
import emoji from "../../assets/emoji.png"
import HeaderSosial from './HeaderSosial'

const Header = () => {
  return (
    <header>
      <section className="container header__container" id="home">
        <h5>
          Hello I'm
        </h5>
        <h1>
          Felipe Garcia Suez
        </h1>
        <h5 className="text-light">
          Fullstack Developer
        </h5>
        <CTA />
        <HeaderSosial />
        <div className="me">
          <img scr={emoji} alt="Feli"/>
        </div>
        <a href="#contact" className='scroll__down'>Scroll Down</a>
        </section>
    </header>
  )
}

export default Header