import { useState, useEffect } from "react"

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

export default function CampaignSimpleInput(props) {
    const { path, placeholder } = props
    const [innerValue, setInnerValue] = useState('')

    function loadInnerValue() {
        if (typeof window === 'undefined') return
        const campaign = JSON.parse(localStorage.getItem('campaign'))
        setInnerValue(getPathEnd(campaign, path))
    }

    function unsavedData() {
        if (typeof window === 'undefined') return
        const campaign = JSON.parse(localStorage.getItem('campaign'))
        return getPathEnd(campaign, path) !== innerValue
    }

    function saveData() {
        if (typeof window === 'undefined' || !unsavedData()) return
        let campaign = JSON.parse(localStorage.getItem('campaign'))
        deepSet(campaign, path, innerValue)
        localStorage.setItem('campaign', JSON.stringify(campaign))
    }

    function onInputChange(e) {
        const newValue = e.target.value ? e.target.value : ''
        setInnerValue(newValue)
    }

    useEffect(() => {
        loadInnerValue()
    }, [])

    useEffect(() => {
        saveData()
    }, [innerValue])

    return (
        <div>
            <label>{path[0]}: </label>
            <input placeholder={placeholder} value={innerValue} onChange={onInputChange}></input>
        </div>
    )
}