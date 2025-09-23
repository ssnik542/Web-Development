import { useEffect, useState } from 'react';
import './App.css';
const cardImages = [
  { "src": "https://img.icons8.com/doodle/48/000000/reddit--v4.png", Match: false },
  { "src": "https://img.icons8.com/doodle/48/000000/facebook-new.png", Match: false },
  { "src": "https://img.icons8.com/doodle/48/1A1A1A/linkedin--v2.png", Match: false },
  { "src": "https://img.icons8.com/doodle/48/000000/instagram--v1.png", Match: false },
  { "src": "https://img.icons8.com/doodle/48/000000/old-twitter-logo.png", Match: false },
  { "src": "https://img.icons8.com/doodle/48/000000/--tinder.png", Match: false }
]
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false);
  //shuffle card
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setchoiceOne(null);
    setchoiceTwo(null);
    setCards(shuffledCards)
    setTurns(0);
  }

  //handle a choice
  const handleClick = (card) => {
    if (!disable) {
      choiceOne ? setchoiceTwo(card) : setchoiceOne(card);
    }

  }

  //reset choices & increase turn
  const resetTurn = () => {
    setchoiceOne(null);
    setchoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisable(false);
  }
  //compare 2selected card
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, Match: true }
            }
            else {
              return card
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  const isfliped = (card) => {
    return card === choiceOne || card === choiceTwo || card.Match
  }
  return (
    <div className="App">
      <div className='topBar'>
        <h1>Magic Match</h1>
        <button onClick={shuffleCards}>New Game</button>
      </div>
      <div className="card-grid">
        {cards.map(card => (
          < div className='card' key={card.id} >
            <div className={isfliped(card) ? 'flipped' : ""}>
              <div>
                <img className='front'
                  src={card.src}
                  alt="card_front"></img>
                <img
                  className="back"
                  src="https://img.icons8.com/bubbles/50/000000/picture.png"
                  alt="card back"
                  onClick={() => handleClick(card)}></img>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className='turn'>Turns : {turns}</p>
    </div >
  );
}

export default App;
