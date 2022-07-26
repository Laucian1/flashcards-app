import React, { useEffect, useState } from "react"
import {Switch, Route} from "react-router-dom"
import {listDecks} from "../../utils/api/index"

function Home() {
    const [decks, setDecks] = useState([])
    const [error, setError] = useState(undefined)

    useEffect(() => {
        const abortController = new AbortController()

        listDecks(abortController.signal).then(setDecks).catch(setError)

        return () => abortController.abort()
    }, [])
    
    /*if (error) {
        To be updated
        return <p>Error: {error}</p>
    }

    const list = decks.map((deck) => <p>`${deck.name}</p>)

    return {list}*/
}

export default Home