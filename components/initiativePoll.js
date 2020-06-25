import { useState } from "react"

export default function InitiativePoll(props) {
    const { state, setState, startCombat } = props
    const [playerIndex, setPlayerIndex] = useState(0)
    const [players, setPlayers] = useState(getPlayers())

    function getPlayers() {
        let results = []
        for (let combatant of state.combat.combatants) {
            if (combatant.type === 'player') results.push(combatant)
        }
        return results
    }

    function next() {
        setPlayerIndex(playerIndex + 1)
    }


    return (
        <>
            <div className='initiativePollContainer'>
                <p>Initiative Polling. Ask for each player character in order THEN start combat by calling the function passed to us...</p>
                <p>Polling for: {players[playerIndex].playerName} ({players[playerIndex].name})</p>
                <button className='pollBtn startBtn' onClick={startCombat}>Start Combat</button>
                <button className='pollBtn nextBtn' onClick={next}>Next Player</button>
            </div>
            <style jsx>{`
                .initiativePollContainer {
                    z-index: 1000;
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                }
                .pollBtn {
                    height: 50px;
                    width: 100px;
                    transition: 0.3s;
                    position: absolute;
                    bottom: 25px;
                }
                .startBtn {
                    background-color: red;
                    left: 25%;
                }
                .nextBtn {
                    background-color: green;
                    right: 25%;
                }
            `}</style>
        </>
    )
}