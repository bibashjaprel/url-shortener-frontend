import React from 'react'

const Footer = () => {
  return (
    <div className='mt-10'>
      <p className='text-primary-700'>&copy; {new Date().getFullYear()} URL Shortener All rights reserved</p>
    </div>
  )
}

export default Footer
