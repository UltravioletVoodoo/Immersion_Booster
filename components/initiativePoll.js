import { useState } from "react"

export default function InitiativePoll(props) {
    const { state, setState, startCombat, players } = props
    const [playerIndex, setPlayerIndex] = useState(0)
    const [initiativePairs, setInitiativePairs] = useState([])
    const [inputValue, setInputValue] = useState('')

    function atEnd() {
        return playerIndex === players.length
    }

    function next() {
        setInputValue('')
        if (!atEnd()) setPlayerIndex(playerIndex + 1)
    }

    function handleInitiativeSubmission() {
        setInitiativePairs(initiativePairs.concat({name: players[playerIndex].name, initiative: inputValue}))
        next()
    }

    function submitResults() {
        let newState = {... state}
        for (let pair of initiativePairs) {
            for (let combatant of newState.combat.combatants) {
                if (combatant.type !== 'player') continue
                if (combatant.name === pair.name) {
                    combatant.initiative = pair.initiative
                }
            }
        }
        setState(newState)
    }

    function finishPoll() {
        submitResults()
        startCombat()
    }

    function inputChangeHandler(e) {
        const newValue = e.target.value ? e.target.value : ''
        setInputValue(newValue)
    }


    return (
        <>
            <div className='initiativePollContainer'>
                {!atEnd() ? (
                    <>
                        <p>Initiative Polling. Ask for each player character in order THEN start combat by calling the function passed to us...</p>
                        <p>Polling for: {players[playerIndex].playerName} ({players[playerIndex].name})</p>
                        <label>Initiative Score</label>
                        <input value={inputValue} onChange={inputChangeHandler} type='number'></input>
                        <button className='pollBtn nextBtn' onClick={handleInitiativeSubmission} disabled={inputValue === ''}>Next Player</button>
                    </>
                ) : (
                    <>
                        <p>Okay start combat by pressing this button diggity dawg</p>
                        <button className='pollBtn startBtn' onClick={finishPoll}>Start Combat</button>
                    </>
                )}
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
                    left: 50%;
                    transform: translateX(-50%)
                }
                .startBtn {
                    background-color: red;
                }
                .nextBtn {
                    background-color: green;
                }
            `}</style>
        </>
    )
}