import React from 'react'
import './Card.scss'

const Card = ({ user }) => {
  const { avatar, email, first_name, last_name } = user

  return (
    <div className="card">
      <div className="User-avatar">
        <img src={avatar} alt="Avatar" />
      </div>
      <div className="User-details">
        <h4>{first_name + ' ' + last_name}</h4>
        <h5>{email}</h5>
      </div>
    </div>
  )
}

export default Card