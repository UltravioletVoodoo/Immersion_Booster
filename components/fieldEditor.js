import { useRef } from "react";
import deepCopy from "../util/deepcopy";

export default function FieldEditor(props) {
    const { fieldName, state, setState } = props
    const inputRef = useRef(null)

    function updateField() {
        const newState = deepCopy(state)
        newState[fieldName] = inputRef.current.value
        setState(newState)
    }

    function deleteField() {
        const newState = deepCopy(state)
        newState[fieldName] = ''
        setState(newState)
    }

    return (
        <>
            <div className='fieldEditor'>
                <input className='fieldInput' ref={inputRef} placeholder={fieldName}></input>
                <button className='fieldBtn' onClick={updateField}>Update {fieldName}</button>
                <button className='fieldBtn' onClick={deleteField}>Delete {fieldName}</button>
            </div>
            <style jsx>{`
                .fieldEditor {
                    position: relative;
                    width: 80%;
                    left: 10%;
                    text-align: center;
                }
                .fieldInput {
                    display: block;
                    width: 100%;
                }
                .fieldBtn {
                    width: 50%;
                }
            `}</style>
        </>
    )
}