import React, { useState } from "react"
import {useHistory, Link } from "react-router-dom"
import { createDeck } from "../../utils/api/index"

function CreateDeck() {
    const history = useHistory()
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")

    const handleNameChange = (event) => setName(event.target.value)
    const handleDescChange = (event) => setDesc(event.target.value)

    const handleSubmit = (event) => {
        event.preventDefault()
        createDeck({
            name: name,
            description: desc
        }).then((newDeck) => history.push(`/decks/${newDeck.id}`))
    }

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home mx-1"></span>
                            Home
                        </Link>
                    </li>
                    <li className="breacrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h3>Create Deck</h3>
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
                    <Link to={`/`} className="btn btn-secondary mx-1">
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

export default CreateDeck