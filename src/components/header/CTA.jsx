import React from 'react'
import CV_SPANISH from '../../assets/Felipe Garcia ESPAÑOL CV.pdf'
import CV_ENGLISH from '../../assets/Felipe Garcia ENGLISH CV.pdf'

const CTA = () => {
  return (
    <div className='cta'>
       <a href={CV_ENGLISH} download className='btn'>Download English CV</a>
       <a href={CV_SPANISH} download className='btn'>Download Spanish CV</a>
       <a href='#contact' className='btn btn-primary'>Let's Talk</a>
    </div>
  )
}

export default CTA