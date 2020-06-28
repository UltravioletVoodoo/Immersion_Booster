import Control from "./control"
import deepCopy from "../util/deepcopy"
import { renderToModal, clearModal } from "./modal"
import InsertionForm from "./insertionForm"
import adjustTurn from "../util/adjustTurn"

export default function CharacterControls(props) {
    const { state, setState, selectedCharacters } = props

    function killCharacters() {
        if (selectedCharacters.length === 0) return
        let newState = deepCopy(state)

        newState.combat.combatants = newState.combat.combatants.filter((combatant) => {return !selectedCharacters.includes(combatant.name)})
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

        // Adjust for turn breakage
        adjustTurn(newState, currentTurn)
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