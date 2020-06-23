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
            <div className='selectedCharacterControlsTitle'>
                <div className='selectedCharacterControlsTitleText'>Initiative Tracker Controls</div>
            </div>
            {state.isCombat ? (
                <div className='controlsContainer'>
                        <div className='characterSelector'>
                            {state.combat.combatants.map((c, i) => (
                                <CombatantSelection key={i} combatant={c} isSelected={selectedCharacters.includes(c.name)} onClick={toggleSelection} />
                            ))}
                        </div>
                        <div className='characterControls'>
                            <CharacterControls state={state} setState={setState} selectedCharacters={selectedCharacters} />
                        </div>
                </div>
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
                .controlsContainer {
                    position: absolute;
                    width: 100%;
                    height: calc(100% - 25px);
                    top: 25px;
                }
                .characterSelector {
                    width: 50%;
                    border-right: 1px solid black;
                    height: 100%;
                    overflow-y: auto;
                }
                .characterControls {
                    position: absolute;
                    left: 50%;
                    top: 0;
                    width: 50%;
                }
                .selectedCharacterControlsTitle {
                    width: 100%;
                    height: 25px;
                    position: absolute;
                    text-align: center;
                    border-bottom: 1px solid black;
                }
                .selectedCharacterControlsTitleText {
                    font-size: 16px;
                    position: absolute;
                    width: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                }
            `}</style>
        </>
    )
}