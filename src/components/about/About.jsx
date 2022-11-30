import React from 'react'
import './About.css'
import AboutMe from '../../assets/img port.jpg'
import {FaAward} from 'react-icons/fa'
import {FaBookOpen} from 'react-icons/fa'
import {FiUser} from 'react-icons/fi'
import {VscFolderLibrary} from 'react-icons/vsc'


const About = () => {
  return (
    <section id="about">
      <h5>
        Get To Know
      </h5>
      <h2>
        About Me
      </h2>
      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={AboutMe} alt="About Me" />
          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon"/>
              <h5>
                Experience
              </h5>
              <small>
                +Half year working
              </small>
            </article>
            <article className="about__card">
              <FiUser className="about__icon"/>
              <h5>
                Clients
              </h5>
              <small>
                Selling freelance pages
              </small>
            </article>
            <article className="about__card">
              <FaBookOpen className="about__icon"/>
              <h5>
                Knowledge
              </h5>
              <small>
                Currently taking a technical course
              </small>
            </article>
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Fugiat error illum saepe molestias eligendi ab officiis recusandae quod maiores architecto.
          </p>
          <a href="#contact" className="btn btn-primary">Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default About