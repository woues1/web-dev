import React from 'react'
import './Random.css'
function Random(props) {

    const GenerateRandomInt = (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max -  min + 1)+ min)
    }
    const min = props.min;
    const max = props.max
  return (
    <div className="Random-int">
      <p>Random value between {min} and {max} is {GenerateRandomInt(min, max)}</p>
    </div>
  )
}

export default Random
