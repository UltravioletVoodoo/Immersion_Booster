import Control from "./control"
import { useState } from "react"
import CombatantSelection from "./combatantSelection"
import CharacterControls from "./characterControls"

export default function SelectedCharacterControls(props) {
    const { state, setState } = props
    const [selectedCharacters, setSelectedCharacters] = useState([])
    
    function startCombat() {
        const newState = {... state}
        newState.isCombat = true
        setState(newState)
    }

    function addToSelection(name) {
        let newCharacters = [... selectedCharacters]
        newCharacters.push(name)
        setSelectedCharacters(newCharacters)
    }

    function removeFromSelection(name) {
        const newCharacters = selectedCharacters.filter(c => c !== name)
        console.log(selectedCharacters, newCharacters)
        setSelectedCharacters(newCharacters)
    }

    function toggleSelection(name) {
        if (selectedCharacters.includes(name)) {
            removeFromSelection(name)
        } else {
            addToSelection(name)
        }
    }

    return (
        <>
            {state.isCombat ? (
                <>
                        <div className='characterSelector'>
                            {state.combat.combatants.map((c, i) => (
                                <CombatantSelection key={i} combatant={c} isSelected={selectedCharacters.includes(c.name)} onClick={toggleSelection} />
                            ))}
                        </div>
                        <div className='characterControls'>
                            <CharacterControls state={state} setState={setState} />
                        </div>
                </>
            ) : (
                <div className='startCombat'>
                    <img onClick={startCombat} src='/swords-emblem.svg'></img>
                </div>
            )}
            <style jsx>{`
                .startCombat {
                    width: 150px;
                    height: 150px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    opacity: 0.5;
                }
                .startCombat:hover {
                    opacity: 1;
                }
                .characterSelector {
                    width: 50%;
                    height: 100%;
                    border: 1px solid black;
                    overflow-y: scroll;
                }
                .characterControls {
                    position: absolute;
                    left: 50%;
                    top: 0;
                    width: 50%;
                    height: 100%;
                    overFlow-y: scroll;
                }
            `}</style>
        </>
    )
}