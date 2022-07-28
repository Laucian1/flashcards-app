import React from "react"
import {useHistory} from "react-router-dom"
import { deleteDeck, deleteCard } from "../../utils/api/index"

export function DeckDelete({deckId}) {
    const history = useHistory()

    function handleDeckDelete() {
        const deleteDeckPrompt = window.confirm("Delete this deck? You will not be able to recover it.")

        if(deleteDeckPrompt) {
            deleteDeck(deckId)
            .then(history.push("/"))
            .then(window.location.reload())
        }
    }

    return (
        <button className="btn btn-danger float-right" onClick={handleDeckDelete}>
            <span className="oi oi-trash"></span>
        </button>
    )
}

export function CardDelete({cardId, deckId}) {
    function handleCardDelete() {
        const deleteCardPrompt = window.confirm("Delete this card? You will not be able to recover it.")

        if(deleteCardPrompt) {
            deleteCard(cardId)
            .then(window.location.reload())
        }
    }

    return (
        <button className="btn btn-danger float-right" onClick={handleCardDelete}>
            <span className="oi oi-trash"></span>
        </button>
    )
}
