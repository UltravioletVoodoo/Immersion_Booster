import { useEffect, useState } from "react"
import CampaignSimpleInput from "./campaignSimpleInput"


function Player(props) {
    const { id } = props
    const path = ['players', id]

    return (
        <div>
            <label>{id}: </label>
            <CampaignSimpleInput path={path} placeholder='test' />
        </div>
    )
}

function Players(props) {
    const { players } = props
    for (let playerId in players) {
        players[playerId] = (<Player key={playerId} id={playerId} />)
    }

    return (
        <div>
            {players}
        </div>
    )
}

export default function CampaignPlayersInput() {
    const [players, setPlayers] = useState(null)
    
    function loadPlayers() {
        if (typeof window === 'undefined') return
        setPlayers(JSON.parse(localStorage.getItem('campaign')).players)
    }

    function addPlayer() {
        setPlayers(players.concat(''))
    }

    useEffect(() => {
        loadPlayers()
    }, [])

    return (
        <div>
            {players && (
                <>
                    <Players players={players} />
                    <button onClick={addPlayer}>Add new player</button>
                </>
            )}
        </div>
    )
}