import { useState, useEffect } from "react"
import css from "styled-jsx/css"


const inputCss = css`
.labelContainer {
    display: inline-block;
    width: 20%;
}
label {
    font-size: 20px;
    padding-right: 20px;
}
.inputContainer {
    display: inline-block;
}
input {
    width: 100%;
    height: 20px;
    border-radius: 5px;
}
`


function getPathEnd(obj, path) {
    let result = obj
    for (let pathComponent of path) {
        result = result[pathComponent]
    }
    return result ? result : ''
}

function deepSet(obj, path, value) {
    const pathCopy = [... path]
    const last = pathCopy.pop()
    for (let key of pathCopy) {
        obj = obj[key]
    }
    obj[last] = value
}

function saveData(newValue, path) {
    if (typeof window === 'undefined') return
    let campaign = JSON.parse(localStorage.getItem('campaign'))
    deepSet(campaign, path, newValue)
    localStorage.setItem('campaign', JSON.stringify(campaign))
}

export default function CampaignSimpleInput(props) {
    const { path, placeholder, label } = props
    const [innerValue, setInnerValue] = useState('')

    function loadInnerValue() {
        if (typeof window === 'undefined') return
        const campaign = JSON.parse(localStorage.getItem('campaign'))
        const newValue = getPathEnd(campaign, path)
        setInnerValue(newValue)
        saveData(newValue, path)
    }

    function onInputChange(e) {
        const newValue = e.target.value ? e.target.value : ''
        setInnerValue(newValue)
        saveData(newValue, path)
    }

    useEffect(() => {
        loadInnerValue()
    }, [])

    return (
        <>
            {label && (
                <div className='labelContainer'>
                    <label>{label}: </label>
                </div>
            )}
            <div className='inputContainer' style={label ? {width: '80%'} : {width: '100%'}}>
                <input placeholder={placeholder} value={innerValue} onChange={onInputChange}></input>
            </div>
            <style jsx>{inputCss}</style>
        </>
    )
}