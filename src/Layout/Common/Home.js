import React from "react"
import { Link } from "react-router-dom"
import DeckList from "./DeckList"

function Home() {
    return (
        <React.Fragment>
            <Link to="/decks/new"
            className="btn btn-secondary"
            type="button">
                <span className="oi oi-plus mr-1"></span>
                Create Deck
            </Link>
            <DeckList />
        </React.Fragment>
    )
}

export default Home