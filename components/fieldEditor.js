import { useRef, useState } from "react";
import deepCopy from "../util/deepcopy";

export default function FieldEditor(props) {
    const { fieldName, state, setState } = props
    const [inputValue, setInputValue] = useState('')

    function updateField() {
        const newState = deepCopy(state)
        newState[fieldName] = inputValue
        setState(newState)
        clearInput()
    }

    function deleteField() {
        const newState = deepCopy(state)
        newState[fieldName] = ''
        setState(newState)
        clearInput()
    }

    function clearInput() {
        setInputValue('')
    }

    function handleInputChange(e) {
        const newValue = e.target.value ? e.target.value : ''
        setInputValue(newValue)
    }

    return (
        <>
            <div className='fieldEditor'>
                <input className='fieldInput' value={inputValue} onChange={handleInputChange} placeholder={fieldName}></input>
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