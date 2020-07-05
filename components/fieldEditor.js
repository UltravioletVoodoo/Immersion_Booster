import { useRef, useState, useEffect } from "react";
import deepCopy from "../util/deepcopy";

export default function FieldEditor(props) {
    const { fieldName, placeholder, state, setState } = props
    const [inputValue, setInputValue] = useState('')


    function updateField() {
        console.log('updateField called...')
        console.log('inputValue: ', inputValue)
        const newState = deepCopy(state)
        newState[fieldName] = inputValue
        setState(newState)
        clearInput()
        console.log('updatedField Finished.')
    }

    function clearInput() {
        setInputValue('')
    }

    function handleInputChange(e) {
        const newValue = e.target.value ? e.target.value : ''
        setInputValue(newValue)
    }
    
    function handleKeyPress(e) {
        if (e.key === 'Enter') updateField()
    }

    useEffect(() => {
        window.addEventListener('keyup', handleKeyPress)

        return () => {
            window.removeEventListener('keyup', handleKeyPress)
        }
    }, [inputValue])

    return (
        <>
            <div className='fieldEditor'>
                <input className='fieldInput' value={inputValue} onChange={handleInputChange} placeholder={placeholder}></input>
            </div>
            <style jsx>{`
                .fieldEditor {
                    position: relative;
                    width: 80%;
                    left: 10%;
                    text-align: center;
                }
                .fieldInput {
                    position: relative;
                    margin-bottom: 10px;
                    width: 100%;
                    height: 20px;
                }
            `}</style>
        </>
    )
}