import React, { useState, useEffect } from "react"
import { useHistory, useParams, Link } from "react-router-dom"
import { readDeck, readCard, updateCard}  from "../../utils/api/index"
import CardForm from "./CardForm"

function EditCard() {
    const [deck, setDeck] = useState([])
    const [front, setFront] = useState("")
    const [back, setBack] = useState("")
    const [chosenCard, setChosenCard] = useState({})
    const { deckId } = useParams()
    const {cardId } = useParams()
    const history = useHistory()

    useEffect(() => {
        const deckAbort = new AbortController()

        async function loadDeck() {
            try {
                const showDeck = await readDeck(deckId, deckAbort.signal)
                setDeck(showDeck)
            }
            catch (error) {
                console.log("Error reading deck")
            }

            return () => {
                deckAbort.abort()
            }
        }

        loadDeck()
    }, [deckId])

    useEffect(() => {
        const cardAbort = new AbortController()

        async function findCard() {
            try {
                const showCard = await readCard(cardId, cardAbort.signal)
                setChosenCard(showCard)
                setFront(showCard.front)
                setBack(showCard.back)
            }
            catch (error) {
                console.log("Error reading card")
            }

            return () => {
                cardAbort.abort()
            }
        }

        findCard()
    }, [cardId])

    const handleSubmit = (event) => {
        event.preventDefault()
        updateCard({
            ...chosenCard,
            front: front,
            back: back,
        }).then((updatedCard) => history.push(`/decks/${deck.id}`))
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home mx-1"></span>
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {chosenCard.id}</li>
                </ol>
            </nav>
            <h3>Edit Card</h3>
            <div className="card-info">
                <CardForm
                    front={front}
                    back={back}
                    deck={deck}
                    setFront={setFront}
                    setBack={setBack}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}

export default EditCard