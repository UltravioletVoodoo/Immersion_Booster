import Control from "./control"
import { useState } from "react"
import CombatantSelection from "./combatantSelection"
import CharacterControls from "./characterControls"
import TitledBox from "./titledBox"

export default function SelectedCharacterControls(props) {
    const { state, setState } = props
    const [selectedCharacters, setSelectedCharacters] = useState([])

    function addToSelection(name) {
        let newCharacters = [... selectedCharacters]
        newCharacters.push(name)
        setSelectedCharacters(newCharacters)
    }

    function removeFromSelection(name) {
        const newCharacters = selectedCharacters.filter(c => c !== name)
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
            <TitledBox text='Initiative Tracker Controls' leftBorder>
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
                        <img src='/swords-emblem.svg'></img>
                    </div>
                )}
            </TitledBox>
            <style jsx>{`
                .startCombat {
                    width: 150px;
                    height: 150px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .controlsContainer {
                    position: absolute;
                    width: 100%;
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
            `}</style>
        </>
    )
}