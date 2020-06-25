import { useState } from "react"

export default function InitiativePoll(props) {
    const { state, setState, startCombat, players } = props
    const [playerIndex, setPlayerIndex] = useState(0)
    const [initiativePairs, setInitiativePairs] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

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
        debugger;
        // Match up our initiative pairs with players in the state and modify their initiatives
        let newState = {... state}
        for (let pair of initiativePairs) {
            for (let combatantID in newState.combat.combatants) {
                let combatant = newState.combat.combatants[combatantID]
                if (combatant.type !== 'player') continue
                if (pair.name === combatant.name) {
                    // Shoehorn in the new initiative value
                    console.log(newState.combat.combatants[combatantID], pair.initiative)
                    newState.combat.combatants[combatantID].initiative = pair.initiative
                    console.log(newState.combat.combatants[combatantID], pair.initiative) // Change IS reflected here...

                }
            }
        }
        console.log(newState) // hmmmmm the change is NOT reflected here...
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