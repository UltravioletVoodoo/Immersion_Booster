import Control from "./control"
import { useState } from "react"

export default function SelectedCharacterControls(props) {
    const { state, setState } = props
    const [selectedCharacters, setSelectedCharacters] = useState([])
    
    function startCombat() {
        const newState = {... state}
        newState.isCombat = true
        setState(newState)
    }

    return (
        <>
            {state.isCombat ? (
                <>
                    {selectedCharacters.length > 0 ? (
                        <div className='characterControls'>
                            <Control label='Kill' icon='/chewed-skull.svg' activeColor={'red'} onClick={() => console.log('Kill button pressed')} />
                        </div>
                    ) : (
                        <div className='characterSelector'>
                            <p>Placeholder for selection bit</p>
                        </div>
                    )}
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
            `}</style>
        </>
    )
}