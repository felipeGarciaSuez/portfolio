import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'
import {FiDribbble} from 'react-icons/fi'




const HeaderSosial = () => {
  return (
    <div className='header__sosial'>
       <a href="https://www.linkedin.com/in/felipegarciasuez/" target="_blank" rel="noreferrer"><BsLinkedin/></a>
       <a href="https://github.com/felipeGarciaSuez" target="_blank" rel="noreferrer"><FaGithub/></a>
       {/* <a href="https://dribbble.com" target="_blank" rel="noreferrer"><FiDribbble/></a> */}
    </div>
  )
}

export default HeaderSosial