import { useRef, useEffect } from "react";

export default function FieldEditor(props) {
    const { fieldName, placeHolder } = props
    const inputRef = useRef(null)
    let addChannel, deleteChannel

    function updateField() {
        addChannel.postMessage(inputRef.current.value)
    }

    function deleteField() {
        deleteChannel.postMessage('')
    }

    useEffect(() => {
        addChannel = new BroadcastChannel(`add${fieldName}`)
        deleteChannel = new BroadcastChannel(`delete${fieldName}`)

        return () => {
            addChannel.close()
            deleteChannel.close()
        }
    }, [])

    return (
        <div>
            <input ref={inputRef} placeholder={placeHolder}></input>
            <button onClick={updateField}>Update {fieldName}</button>
            <button onClick={deleteField}>Delete {fieldName}</button>
        </div>
    )
}