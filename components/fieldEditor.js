import { useRef } from "react";
import deepCopy from "../util/deepcopy";

export default function FieldEditor(props) {
    const { fieldName, placeHolder, state, setState } = props
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
        <div>
            <input ref={inputRef} placeholder={placeHolder}></input>
            <button onClick={updateField}>Update {fieldName}</button>
            <button onClick={deleteField}>Delete {fieldName}</button>
        </div>
    )
}