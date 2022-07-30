import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory} from "react-router-dom"
import { readDeck, updateDeck } from "../../utils/api"

function EditDeck() {
    const history = useHistory()
    const [deck, setDeck] = useState([])
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const { deckId } = useParams()

    const handleNameChange = (event) => setName(event.target.value)
    const handleDescChange = (event) => setDesc(event.target.value)
    
    useEffect(() => {
        const deckAbort = new AbortController()

        async function loadDeck() {
            try{
                const showDeck = await readDeck(deckId, deckAbort.signal)
                setDeck(showDeck)
                setName(showDeck.name)
                setDesc(showDeck.description)
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
    
    const handleSubmit = (event) => {
        event.preventDefault()
        updateDeck({
            ...deck,
            name: name,
            description: desc
        }).then((updatedDeck) => history.push(`/decks/${updatedDeck.id}`))
    }

    return (
        <div className="edit-deck">
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
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        onChange={handleNameChange}
                        value={name}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        required
                        onChange={handleDescChange}
                        value={desc}
                    />
                    <br />
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary mx-1">
                        Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary mx-1">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )

}

export default EditDeck