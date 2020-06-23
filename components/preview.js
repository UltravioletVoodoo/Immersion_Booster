import css from "styled-jsx/css"
import { useEffect, useState } from "react"
import Modal from "./modal"
import InitiativePoll from "./initiativePoll"

const previewCss = css`
.preview {
    position: relative;
    height: 100%;
    width: 100%;
    text-align: center;
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.5s;
}
.preview:hover {
    box-shadow: 0 0 10px black;
}
.previewLabel {
    font-size: 20px;
    position: absolute;
    top: 0;
    width: 100px;
    left: calc(50% - 50px);
}
.previewImage {
    height: 100%;
    width: auto;
}
.actionButton {
    width: 25%;
    height: 25%;
    top: 50%;
    z-index: 2;
    position: absolute;
    transform: translate(-50%, -50%);
    transition: 0.5s;
    opacity: 0.4;
}
.actionButton:hover {
    opacity: 1;
}
.leftBtn {
    left: 25%;
}
.rightBtn {
    left: 75%;
}
.centerBtn {
    left: 50%;
}
`

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

export default function Preview(props) {
    const { label, image, enemies, state, setState } = props
    const [players, setPlayers] = useState(null)
    const [polling, setPolling] = useState(false)
    const enemiesPresent = checkEnemiesPresent(enemies)
    const encounterBtnClasses = `actionButton ${enemiesPresent ? 'leftBtn' : 'centerBtn' }`

    function update(isCombat) {
        const newState = {... state}
        newState.imageLabel = label
        newState.imageUrl = image
        newState.isCombat = isCombat
        const newEnemies = enemies ? [...enemies] : []
        newState.combat.combatants = newEnemies.concat(players)
        newState.combat.turn = 0
        setState(newState)
    }

    function encounter() {
        update(false)
    }

    function combat() {
        setPolling(true)
    }

    function startCombat() {
        setPolling(false)
        update(true)
    }

    useEffect(() => {
        setPlayers(loadPlayers())
    }, [])

    return (
        <>
            <div className='preview'>
                <label className='previewLabel'>{label}</label>
                <img className='previewImage' src={image}></img>
                <img className={encounterBtnClasses} src='/scroll-quill.svg' onClick={encounter}></img>
                {enemiesPresent && (
                    <img className='actionButton rightBtn' src='/swords-emblem.svg' onClick={combat}></img>
                )}
                {polling && (
                    <Modal>
                        <InitiativePoll startCombat={startCombat} />
                    </Modal>
                )}
            </div>
            <style jsx>{previewCss}</style>
        </>
    )
}