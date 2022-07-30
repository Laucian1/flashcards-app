import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { listDecks } from "../../utils/api/index"
import { DeckDelete } from "./DeleteButtons"

function DeckList() {
    const [decks, setDecks] = useState([])
    const [error, setError] = useState(undefined)

    useEffect(() => {
        const abortController = new AbortController()

        listDecks(abortController.signal).then(setDecks).catch(setError)

        return () => abortController.abort(error)
    }, [])

    const list = decks.map((deck) => {
        let cardCount = deck.cards.length
        return (
            <div className="border rounde p-2 my-2" key={deck.id}>
                <div>
                    <h3>{deck.name}
                        <small className="float-right">
                            {cardCount} card{cardCount !== 1 ? "s" : ""}
                        </small>
                    </h3>
                    <p>{deck.description}</p>
                </div>
                <div>
                    <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary m-1">
                        <span className="oi oi-pencil mr-1 float-left"></span>
                        Edit
                    </Link>
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary mx-1">
                        <span className="oi oi-eye mx-1"></span>
                        View
                    </Link>
                    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                        <span className="oi oi-book mx-1"></span>
                        Study
                    </Link>
                    <DeckDelete deckId={deck.id}/>
                </div>
                
            </div>
        )
    })

   return (
    <div className="decks">
        {list}
    </div>
   )
}

export default DeckList