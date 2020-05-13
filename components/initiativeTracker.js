import InitiativeChar from "./initiativeChar"
import { useState, useEffect } from "react"


function getPlayers() {
    if (typeof window === 'undefined') return []
    return JSON.parse(localStorage.getItem('campaign')).players
}

export default function InitiativeTracker(props) {
    const { enemies } = props
    const [players, setPlayers] = useState([])
    const [turn, setTurn] = useState(0)
    let turnUpdateChannel

    const characters = enemies.concat(players)
    let charList = []
    for (let charId in characters) {
        if (Array.isArray(characters[charId])) { // Check if its a real player
            charList.push(
            <div>
                <InitiativeChar key={charId} id={charId} playerName={characters[charId][0]} name={characters[charId][1]} myTurn={turn === parseInt(charId)} />
            </div>)
        } else { // Its not a real player
            charList.push(
                <div>
                    <InitiativeChar key={charId} id={charId} name={characters[charId]} myTurn={turn === parseInt(charId)} />
                </div>
            )
        }
    }

    function incrementTurn() {
        setTurn(turn + 1 === players.length + enemies.length ? 0 : turn + 1)
    }

    useEffect(() => {
        setPlayers(getPlayers())
        turnUpdateChannel = new BroadcastChannel('turnUpdate')
        turnUpdateChannel.onmessage = (e) => { incrementTurn() }

        return () => {
            turnUpdateChannel.close()
        }
    }, [turn])
    
    return (
        <div>
            {charList}
        </div>
    )
}