import InitiativeChar from "./initiativeChar"
import { useState, useEffect } from "react"


function getPlayers() {
    if (typeof window === 'undefined') return []
    return JSON.parse(localStorage.getItem('campaign')).players
}

export default function InitiativeTracker(props) {
    const { enemies } = props
    const [players, setPlayers] = useState([])

    const characters = enemies.concat(players)
    let charList = []
    for (let charId in characters) {
        if (Array.isArray(characters[charId])) { // Check if its a real player
            charList.push(
            <div>
                <InitiativeChar key={charId} id={charId} playerName={characters[charId][0]} name={characters[charId][1]} />
            </div>)
        } else { // Its not a real player
            charList.push(
                <div>
                    <InitiativeChar key={charId} id={charId} name={characters[charId]} />
                </div>
            )
        }
    }

    useEffect(() => {
        setPlayers(getPlayers())
    }, [])
    
    return (
        <div>
            <p>Whats up bitches!</p>
            {charList}
        </div>
    )
}