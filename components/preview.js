import { useEffect, useState } from "react"
import { renderToModal, clearModal } from "./modal"
import InitiativePoll from "./initiativePoll"
import deepCopy from "../util/deepcopy"
import charPreProcessing from "../util/charPreProcessing"
import { playSoundEffect } from "./soundEffect"

function checkEnemiesPresent(enemies) {
    try {
        if (enemies.length > 0) return true
        return false
    } catch(e) {
        return false
    }
}

function loadPlayers() {
    if (typeof window === 'undefined') return
    return JSON.parse(localStorage.getItem('campaign')).players
}

function getPlayersFromState(state) {
    let players = []
    for (let combatant of state.combat.combatants) {
        if (combatant.type === 'player') players.push(combatant)
    }
    return players
}

export default function Preview(props) {
    const { label, image, soundEffect, enemies, state, setState } = props
    const [players, setPlayers] = useState(null)
    const enemiesPresent = checkEnemiesPresent(enemies)
    const encounterClasses = `actionBtn ${enemiesPresent ? 'left' : 'center'}`

    function update(isCombat, newState) {
        playSoundEffect(soundEffect)
        newState.imageLabel = label
        newState.imageUrl = image
        newState.combat.combatants = charPreProcessing((enemies ? [... enemies] : []).concat(getPlayersFromState(newState)))
        newState.combat.turn = 0
        newState.isCombat = isCombat
    }

    function encounter() {
        let newState = deepCopy(state)
        update(false, newState)
        setState(newState)
    }

    function combat() {
        renderToModal(<InitiativePoll state={state} setState={setState} startCombat={startCombat} players={players} />)
    }

    function startCombat(newState) {
        update(true, newState)
        clearModal()
    }

    useEffect(() => {
        const newPlayers = loadPlayers()
        setPlayers(newPlayers)
        const newState = deepCopy(state)
        newState.combat.combatants = (enemies ? enemies : []).concat(newPlayers)
        setState(newState)
    }, [])

    return (
        <>
            <div className='preview'>
                <label className='previewLabel'>{label}</label>
                <img className='previewImage' src={image}></img>
                <div className='actionBtns'>
                    <img className={encounterClasses} src='/scroll-quill.svg' onClick={encounter}></img>
                    {enemiesPresent && (
                        <img className='actionBtn right' src='/swords-emblem.svg' onClick={combat}></img>
                    )}
                </div>
            </div>
            <style jsx>{`
                .preview {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: cyan;
                }
                .previewLabel {
                    display: block;
                    width: 100%;
                    height: 20%;
                    border-bottom: 1px solid black;
                }
                .previewImage {
                    position: absolute;
                    left: 0;
                    width: 25%;
                    height: 80%;
                    overflow-y: hidden;
                }
                .actionBtns {
                    position: absolute;
                    left: 25%;
                    width: 75%;
                    height: 80%;
                    background-color: pink;
                }
                .actionBtn {
                    position: absolute;
                    width: 25%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    opacity: 0.5;
                    transition: 0.5s;
                }
                .actionBtn:hover {
                    opacity: 1;
                }
                .left {
                    left: 25%;
                }
                .center {
                    left: 50%;
                }
                .right {
                    left: 75%;
                }
            `}</style>
        </>
    )
}