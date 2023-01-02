import React from 'react';
import './Contact.css';
import {MdOutlineEmail} from 'react-icons/md';
import {RiMessengerLine} from 'react-icons/ri';
import {BsWhatsapp} from 'react-icons/bs';
import { useRef as UseRef } from 'react';
import emailjs from '@emailjs/browser';




const contact = () => {
  const form = UseRef("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_7ijp8co', 'template_rszhlno', form.current, 'RpRSZ_e75XJv1vZQn')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      e.target.reset();
  };


  return (
    <section id="contact">
      <h5>
        Get In Touch
      </h5>
      <h2>
        Contact Me
      </h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <MdOutlineEmail className="contact__option-icon"/>
            <h4>
             Email
            </h4>
            <h5>
              garciasuezfelipe@gmail.com
            </h5>
            <a href="mailto:garciasuezfelipe@gmail.com" target="_blank" rel="noreferrer">Send a message</a>
          </article>
          {/* <article className="contact__option">
            <RiMessengerLine className="contact__option-icon"/>
            <h4>
             Messenger
            </h4>
            <h5>
              example
            </h5>
            <a href="https://example.com" target="_blank" rel="noreferrer">Send a message</a>
          </article> */}
          <article className="contact__option">
            <BsWhatsapp className="contact__option-icon"/>
            <h4>
             WhatsApp
            </h4>
            <h5>
              +54 341 366-9925
            </h5>
            <a href="https://wa.me/3413669925" target="_blank" rel="noreferrer">Send a message</a>
          </article>
        </div>
        {/* END OF CONTACT OPTIONS */}
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="name" placeholder="Your Full Name" required/>
          <input type="email" name="email" placeholder="Your Email" required/>
          <textarea name="message" rows="7" placeholder="Your Message" required></textarea>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default contact