import { useRef } from "react";

export default function FieldEditor(props) {
    const { fieldName, placeHolder, state, setState } = props
    const inputRef = useRef(null)

    function updateField() {
        const newState = {... state}
        newState[fieldName] = inputRef.current.value
        setState(newState)
    }

    function deleteField() {
        const newState = {... state}
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