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
                Currently studying an Associate degree in programming
              </small>
            </article>
          </div>
          <p>
          I am a web developer currently working for Solvo. I started my career with JavaScrirpt, selling pages as a freelancer 
          with technologies like React, Redux, Node, Sequelize and PostgreSQL. I have been working on dependency using Python for more than 5 months,
           which allowed me to expand my knowledge as a programmer and enter the world of object-oriented programming.
          </p>
          <a href="#contact" className="btn btn-primary">Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default About