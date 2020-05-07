import { useState, useEffect } from "react"

function getPathEnd(obj, path) {
    let result = obj
    for (let pathComponent of path) {
        result = result[pathComponent]
    }
    return result ? result : ''
}

function deepSet(obj, path, value) {
    console.log('test: ', obj, path, value)
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
    const { path, placeholder } = props
    const [innerValue, setInnerValue] = useState(undefined)

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
        <div>
            <label>{path[0]}: </label>
            <input placeholder={placeholder} value={innerValue} onChange={onInputChange}></input>
        </div>
    )
}