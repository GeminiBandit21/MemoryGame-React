import { useState } from 'react'
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

  console.log(cards, turns)



//card={card} is creating a prop to be taken in by the SingleCard component
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
            <SingleCard key={card.id} card={card}/>
        ))}
    </div>
    </div>
  );
}

export default App;