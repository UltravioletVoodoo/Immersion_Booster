import { useState } from "react"

export default function ModifyHpForm(props) {
    const { ids, modify, negative } = props
    const [inputValue, setInputValue] = useState('')

    function onInputChange(e) {
        const newValue = e.target.value ? e.target.value : ''
        setInputValue(newValue)
    }

    function onBtnClickHandler() {
        const modifyValue = negative ? -parseInt(inputValue) : parseInt(inputValue)
        modify(ids, modifyValue)
    }

    const inputPlaceholder = `${negative ? 'Harming' : 'Healing'} Value`
    const buttonValue = negative ? 'Harm' : 'Heal'

    return (
        <>
            <div>
                <input type='number' value={inputValue} onChange={onInputChange} placeholder={inputPlaceholder}></input>
                <button onClick={onBtnClickHandler}>{buttonValue}</button>
            </div>
            <style jsx>{`
            
            `}</style>
        </>
    )
}