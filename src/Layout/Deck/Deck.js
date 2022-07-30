import React, { useState, useEffect } from "react"
import { readDeck } from "../../utils/api/index"
import { Link, useParams } from "react-router-dom"
import { DeckDelete, CardDelete } from "../Common/DeleteButtons"


function Deck() {
    const { deckId }= useParams()
    const [cardList, setCardList] = useState([])
    const [deck, setDeck] = useState({})

    useEffect(() => {
        const deckAbort = new AbortController()

        async function loadDeck() {
            try {
                  const deckObject = await readDeck(deckId, deckAbort.signal)
                  setDeck(deckObject)
                  setCardList(deckObject.cards)
              }
              catch (error) {
                  console.log("Error creating deck list")
              }
  
              return () => {
                  deckAbort.abort()
              }
          }
  
          loadDeck()  
    }, [deckId])

    let displayCards
        if(cardList) {
            displayCards = cardList.map((card) => {
                return (
                    <div className="cards border rounded m-1" key={card.id}>
                        <div className="m-1">
                            <p className="font-weight-bold">Front</p>
                            <p>{card.front}</p>
                        </div>

                        <div className="m-1">
                            <p className="font-weight-bold">Back</p>
                            <p>{card.back}</p>
                        </div>
                        <div>
                            <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-secondary m-1">
                                <span className="oi oi-pencil mr-1 float-left"></span>
                                Edit
                            </Link>
                            <CardDelete cardId={card.id} deckId={deck.id} />
                        </div>
                    </div>
                )
            })
        }
        else {
            displayCards = "Loading"
        }

    return (
        <div className="deck">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home mx-1"></span>
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <div className="header">
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
            </div>
            <div className="buttons">
                <Link to={`/decks/${deck.id}/edit`} className="btn btn-primary mx-1">
                    <span className="oi oi-book mr-1"></span>
                    Study
                </Link>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mx-1">
                    <span className="oi oi-plus mr-1"></span>
                    Add Cards
                </Link>
                <DeckDelete deckId={deck.id} />
            </div>
            <h3 className="my-2">Cards</h3>
            <div>{displayCards}</div>
        </div>
    )
}

export default Deck