import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"

function CardList({deck, cardCount, cards}) {
    const [index, setIndex] = useState(0)
    const [flipped, setFlipped] = useState(true)
    const history = useHistory()

    if (cardCount < 3) {
        return (
            <div>
                <h4> Not Enough Cards </h4>
                <p> You need at least 3 cards to study. There are {cardCount} cards in this deck.</p>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
                    <span className="oi oi-plus mr-1"></span>
                    Add Cards
                </Link>
            </div>
        )
    }

    function flipCard() {
        setFlipped(!flipped)
    }

    function nextCard() {
        if (index < (cardCount-1)) {
            setIndex(index + 1)
            setFlipped(true)
        } else {
            const restartPrompt = window.confirm("Restart? Click 'Cancel' to return to the home page.")
            if (restartPrompt) {
                setIndex(0)
                setFlipped(true)
            } else history.push("/")
        }
    }

    return (
        <div className="card-body border rounded p-2 my-2">
            <div className="card-title">
                <h4>Card {index + 1} of {cardCount}</h4>
                <p>{flipped ? cards[index]?.front : cards[index]?.back}</p>
            </div>
            <div className="buttons">
                <button className="btn btn-secondary mx-1" onClick={flipCard}>Flip</button>
                {!flipped && (<button className="btn btn-primary" onClick={nextCard}>Next</button>)}
            </div>
        </div>
    )
}

export default CardList