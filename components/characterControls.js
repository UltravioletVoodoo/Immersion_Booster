import Control from "./control"
import deepCopy from "../util/deepcopy"
import { renderToModal, clearModal } from "./modal"
import InsertionForm from "./insertionForm"
import { statusEffect } from "../util/placeholders"

export default function CharacterControls(props) {
    const { state, setState, selectedCharacters } = props

    function killCharacter(character, newState) {
        const index = newState.combat.combatants.findIndex((c) => c.name === character)
        newState.combat.combatants = newState.combat.combatants.filter((c) => c.name !== character)
        if (index < newState.combat.turn) newState.combat.turn -= 1
    }

    function killCharacters() {
        let newState = deepCopy(state)
        for (let charToKill of selectedCharacters) {
            killCharacter(charToKill, newState)
        }
        setState(newState)
    }

    function getFirstSelectedCharacter() {
        if (selectedCharacters.length === 0) return
        for (let combatant of state.combat.combatants) {
            if (selectedCharacters.includes(combatant.name)) return combatant.name
        }
    }

    function getLastSelectedCharacter() {
        if (selectedCharacters.length === 0) return
        let selection = ''
        for (let combatant of state.combat.combatants) {
            if (selectedCharacters.includes(combatant.name)) selection = combatant.name
        }
        return selection
    }

    function insert(id, combatant) {
        let newState = deepCopy(state)
        const currentTurn = newState.combat.combatants[newState.combat.turn].name

        // Inserting after the last combatant is a simple case
        if (newState.combat.combatants.length === id) {
            newState.combat.combatants.push(combatant)
        } else {
            newState.combat.combatants.splice(id, 0, combatant)
        }

        setState(newState)
        clearModal()
    }

    function insertionBase(characterGetter, after) {
        if (selectedCharacters.length === 0) return
        const appropriateCharacter = characterGetter()
        let insertionId = 0
        for (let combatantId in state.combat.combatants) {
            const combatant = state.combat.combatants[combatantId]
            if (combatant.name === appropriateCharacter) {
                insertionId = combatantId
            }
        }
        if (after) insertionId++
        renderToModal(<InsertionForm id={insertionId} insert={insert} state={state} />)
    }

    function insertBefore() {
        insertionBase(getFirstSelectedCharacter, false)
    }

    function insertAfter() {
        insertionBase(getLastSelectedCharacter, true)
    }


    return (
        <>
            <div className='controls'>
                <div className='controlBlock'>
                    <Control label='Kill' icon='/chewed-skull.svg' onClick={killCharacters} />
                    <Control label='Modify' icon='/potion-ball.svg' onClick={() => console.log('Affect button was pressed')} />
                </div>
                <div className='controlBlock'>
                    <Control label='Heal' icon='/heart-plus.svg' onClick={() => console.log('Heal button was pressed')} />
                    <Control label='Harm' icon='/heart-minus.svg' onClick={() => console.log('Harm button was pressed')} />
                </div>
                <div className='controlBlock'>
                    <Control label='Insert Before' icon='/player-previous.svg' onClick={insertBefore} />
                    <Control label='Insert After' icon='/player-next.svg' onClick={insertAfter} />
                </div>
            </div>
            <style jsx>{`
                .controls {
                    width: 100%;
                    text-align: center;
                    margin-top: 30px;
                }
                .controlBlock {
                    width: 100%;
                }
            `}</style>
        </>
    )
}