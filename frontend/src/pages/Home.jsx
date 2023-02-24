import React from 'react'
import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

function Home() {
  return (
    <div>
      <section className="heading">
        <h1>React App</h1>
        <p>Please choose from option below</p>
      </section>
      <Link to="/" className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Option 1
      </Link>
      <Link to="/" className='btn btn-block'>
        <FaTicketAlt /> Option 2
      </Link>
    </div>
  )
}

export default Home