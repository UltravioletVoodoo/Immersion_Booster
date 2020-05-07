import { useState, useEffect } from "react"
import CampaignSimpleInput from "./campaignSimpleInput"


function Player(props) {
    const { id } = props
    const basePath = ['players', id]

    return (
        <div>
            <label>Player {parseInt(id) + 1}: </label>
            <CampaignSimpleInput path={basePath.concat(0)} placeholder='Player Name' />
            <CampaignSimpleInput path={basePath.concat(1)} placeholder='Character Name' />
        </div>
    )
}

function Encounter(props) {
    const { id } = props
    const basePath = ['encounters', id]
    
    return (
        <div>
            <label>Encounter {parseInt(id) + 1}: </label>
            <CampaignSimpleInput path={basePath.concat(0)} placeholder='Encounter Label' />
            <CampaignSimpleInput path={basePath.concat(1)} placeholder='Encounter Image URL' />
        </div>
    )
}

function getAppropriateComponent(setName, id) {
    switch(setName) {
        case 'players': return <Player key={id} id={id} />
        case 'encounters': return <Encounter key={id} id={id} />
        default: return <p>Oops. No appropriate set found for {setName}</p>
    }
}


function InputSet(props) {
    const { set, setName } = props
    for (let setElementId in set) {
        set[setElementId] = (getAppropriateComponent(setName, setElementId))
    }
    return (
        <div>
            {set}
        </div>
    )
}

export default function CampaignInputSet(props) {
    const { setName } = props
    const [set, setSet] = useState(null)

    function loadSet() {
        if (typeof window === 'undefined') return
        setSet(JSON.parse(localStorage.getItem('campaign'))[setName])
    }

    function addToSet() {
        if (typeof window === 'undefined') return
        setSet(set.concat(''))

        // Make room in local storage for the new addition
        let campaign = JSON.parse(localStorage.getItem('campaign'))
        campaign[setName].push([])
        localStorage.setItem('campaign', JSON.stringify(campaign))
    }

    useEffect(() => {
        loadSet()
    }, [])
    
    return (
        <div>
            {set && (
                <>
                    <InputSet set={set} setName={setName} />
                    <button onClick={addToSet}>Add new {setName}</button>
                </>
            )}
        </div>
    )
}