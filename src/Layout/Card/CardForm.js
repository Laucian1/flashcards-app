import React from "react"
import { Link, useRouteMatch } from "react-router-dom"

function CardForm({deck, front, back, setFront, setBack, handleSubmit}) {
    let { path } = useRouteMatch()
    const handleFrontChange = (event) => setFront(event.target.value)
    const handleBackChange = (event) => setBack(event.target.value)

    if ({ path } === "/decks/:deckId/cards/new") {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea
                        className="form-control"
                        id="front"
                        rows="3"
                        placeholder="Front side of card"
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
                        placeholder="Back side of card"
                        required
                        onChange={handleBackChange}
                        value={back}
                    />
                </div>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mx-1">
                    Done
                </Link>
                <button type="submit" className="btn btn-primary mx-1" >
                    Save
                </button>
            </form>
        )
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea
                        className="form-control"
                        id="front"
                        rows="3"
                        placeholder="Front side of card"
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
                        placeholder="Back side of card"
                        required
                        onChange={handleBackChange}
                        value={back}
                    />
                </div>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mx-1">
                    Cancel
                </Link>
                <button type="submit" className="btn btn-primary mx-1" >
                    Submit
                </button>
            </form>
        )
    }
}

export default CardForm