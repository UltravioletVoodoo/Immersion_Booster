import { useEffect, useState } from "react"
import CampaignSimpleInput from "./campaignSimpleInput"


function Player(props) {
    const { id } = props
    const basePath = ['players', id]
    const playerNamePath = basePath.concat(0)
    const characterNamePath = basePath.concat(1)

    return (
        <div>
            <label>{id}: </label>
            <CampaignSimpleInput path={playerNamePath} placeholder='Player Name' />
            <CampaignSimpleInput path={characterNamePath} placeholder='Character Name' />
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
        if (typeof window === 'undefined') return
        setPlayers(players.concat(''))
        // Initialize an array location for all player data
        let campaign = JSON.parse(localStorage.getItem('campaign'))
        console.log(campaign, 'test', campaign.players)
        campaign.players.push([])
        localStorage.setItem('campaign', JSON.stringify(campaign))
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