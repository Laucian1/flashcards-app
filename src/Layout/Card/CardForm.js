import React from "react"
import { Link } from "react-router-dom"

function CardForm({deck, front, back, setFront, setBack, handleSubmit}) {
    const handleFrontChange = (event) => setFront(event.target.value)
    const handleBackChange = (event) => setBack(event.target.value)

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea
                    className="form-control"
                    id="front"
                    rows="3"
                    placeholder="Question?"
                    required
                    onChange={handleFrontChange}
                    value={front}
                />
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                <textarea
                    className="form-control"
                    id="back"
                    rows="3"
                    placeholder="Answer."
                    required
                    onChange={handleBackChange}
                    value={back}
                />
            </div>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary mx-1">
                Done
            </Link>
            <button type="submit" className="btn btn-primary mx-1">
                Save
            </button>
        </form>
    )
}

export default CardForm