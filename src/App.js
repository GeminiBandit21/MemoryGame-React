import { useEffect, useState } from 'react'
import SingleCard from "./components/SingleCard"
import './App.css'

//Array holding all the images, by storing the source property.
const cardImages=[
  {"src": "/img/helmet-1.png", matched:false},
  {"src": "/img/potion-1.png", matched:false},
  {"src": "/img/ring-1.png", matched:false},
  {"src": "/img/scroll-1.png", matched:false},
  {"src": "/img/shield-1.png", matched:false},
  {"src": "/img/sword-1.png", matched:false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] =useState(false)

  //shuffle cards
  //creates 12 cards in the shuffled array using the spread syntax ...
  const shuffleCards = () =>{
    const shuffledCards =[...cardImages, ...cardImages]
    .sort(() => Math.random() -0.5)
    .map((card)=> ({...card, id:Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

//console.log(cards, turns)

//handles users choice
//if choice one is null/false setChoiceOne, if its true will setChoiceTwo using ternary operator 
const handleChoice = (card) =>{
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  //console.log(card)
}


//Compare 2 selected cards
useEffect(()=> {
  if (choiceOne && choiceTwo){
    setDisabled(true)
    if (choiceOne.src === choiceTwo.src){
      if(choiceOne.id !== choiceTwo.id){
        setCards(preCards=>{
          return preCards.map(card =>{
            if (card.src === choiceOne.src){
              return{...card, matched: true}
            }
            else{
              return card
            }
          })
        })
        resetTurn()}
      else{
        resetTurn()
      }
    }  else{

      setTimeout(() => resetTurn(), 1000)
    }
  }

},[choiceOne, choiceTwo])

console.log(cards)

//reset choices & increase turns
const resetTurn = () =>{
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}

//start a new game automatically
useEffect(() =>{
  shuffleCards()

}, [])

//card={card} is creating a prop to be taken in by the SingleCard component
  return (
    <div className="App">
      <h1>Magic Matchy</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
            <SingleCard 
              key={card.id} 
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
        ))}
    </div>
    <p>Turns: {turns}</p>
    </div>
  );
}

export default App;