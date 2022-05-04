import React from 'react'
import './SingleCard.css'

export default function SingleCard({card}) {

  const handleClick= () => {
    
  }

  return (
    <div className="card">
            <div>
              <img className="front" src={card.src} alt="Card Front"/>
              <img 
              className="back"
              src="./img/cover.png"
              onClick={handleClick}
              alt="Back of Card"
              />
            </div>
    </div>
  )
}