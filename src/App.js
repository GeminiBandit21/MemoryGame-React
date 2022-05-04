import { useEffect, useState } from 'react'
import SingleCard from "./components/SingleCard"
import './App.css'

//Array holding all the images, by storing the source property.
const cardImages=[
  {"src": "/img/helmet-1.png"},
  {"src": "/img/potion-1.png"},
  {"src": "/img/ring-1.png"},
  {"src": "/img/scroll-1.png"},
  {"src": "/img/shield-1.png"},
  {"src": "/img/sword-1.png"}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  //shuffle cards
  //creates 12 cards in the shuffled array using the spread syntax ...
  const shuffleCards = () =>{
    const shuffledCards =[...cardImages, ...cardImages]
    .sort(() => Math.random() -0.5)
    .map((card)=> ({...card, id:Math.random()}))

    setCards(shuffledCards)
    setTurns(0)
  }

//console.log(cards, turns)

//handles users choice
//if choice one is null/false setChoiceOne, if its true will setChoiceTwo using ternary operator 
const handleChoice = (card) =>{
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  console.log(card)
}


//Compare 2 selected cards
useEffect(()=> {
  if (choiceOne && choiceTwo){
    if (choiceOne.src === choiceTwo.src){
      console.log("Match!")
      resetTurn()
    }  else{
      console.log("No Match!")
      resetTurn()
    }
  }

},[choiceOne, choiceTwo])

//reset choices & increase turns
const resetTurn = () =>{
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
}

//card={card} is creating a prop to be taken in by the SingleCard component
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
            <SingleCard 
              key={card.id} 
              card={card}
              handleChoice={handleChoice}
            />
        ))}
    </div>
    </div>
  );
}

export default App;