import { useRef, useEffect } from "react";

export default function FieldEditor(props) {
    const { fieldName } = props
    const inputRef = useRef(null)
    let bc

    function update() {
        bc.postMessage(inputRef.current.value);
    }

    useEffect(() => {
        bc = new BroadcastChannel(fieldName)

        return () => {
            bc.close();
        }
    }, [])

    return (
        <span>
            <input ref={inputRef} placeholder="test"></input>
            <button onClick={update}>Update</button>
        </span>
    )
}