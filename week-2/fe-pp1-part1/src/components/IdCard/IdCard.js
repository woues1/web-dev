import React from 'react'
import './IdCard.css'

function IdCard(props) {
    const BirthDay = `${props.birth.toDateString()}`
  return (
    <div className="card">
        <>
        <img src={props.picture} className="profile-picture"></img>
        </>
        <div className="list">
            <li>First name: {props.firstName}</li>
            <li>Last name: {props.lastName}</li>
            <li>Gender: {props.gender}</li>
            <li>Height: {props.height}</li>
            <li>Birth: {BirthDay}</li>
        </div>
    </div>
  )
}

export default IdCard
