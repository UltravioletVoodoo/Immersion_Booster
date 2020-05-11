import { useState, useEffect } from "react"
import CampaignSimpleInput from "./campaignSimpleInput"
import css from "styled-jsx/css"


const elementGroupCss = css`
.elementGroup {
    background-color: pink;
    position: relative;
    margin: 5px 0 5px 0;
    padding: 20px;
    box-shadow: 0 0 10px black;
    transition: 0.3s;
}
.elementGroup:hover {
    background-color: #f2c655;
}
.title {
    text-align: center;
    font-size: 25px;
    margin-bottom: 20px;
}
.input {
    margin: 0 0 5px 0;
}
`

const inputSetCss = css`
.inputSet {
    background-color: lightsteelblue;
    position: relative;
    padding: 10px;
    margin-bottom: 20px;
}
.addBtnContainer {
    width: 100%;
    text-align: center;
}
.addBtn {
    width: 75%;
    height: 35px;
}
.addBtn:hover {
    border: 1px solid green;
    color: green;
}
`

const combatCss = css`
.combat {
    background-color: red;
    padding: 10px;
}
`


function Player(props) {
    const { id } = props
    const basePath = ['players', id]

    return (
        <>
            <div className='elementGroup'>
                <div className='title'>
                    <label>Player {parseInt(id) + 1}: </label>
                </div>
                <div className='input'>
                    <CampaignSimpleInput path={basePath.concat(0)} placeholder='Player Name' />
                </div>
                <div className='input'>
                    <CampaignSimpleInput path={basePath.concat(1)} placeholder='Character Name' />
                </div>
            </div>
            <style jsx>{elementGroupCss}</style>
        </>
    )
}

function Combat(props) {
    const { id } = props
    const [baddies, setBaddies] = useState([''])

    let baddieList = []
    for (let baddie in baddies) {
        baddieList[baddie] = (<CampaignSimpleInput path={['encounters', id, 2, baddie]} placeholder='Enemy Name' />)
    }

    function addBaddie() {
        setBaddies(baddies.concat(''))
    }

    function loadBaddies() {
        if (typeof window === 'undefined') return
        setBaddies(JSON.parse(localStorage.getItem('campaign')).encounters[id][2])
    }

    useEffect(() => {
        loadBaddies()
    },[])

    return (
        <div className='combat'>
            {baddieList}
            <button onClick={addBaddie}>Add Enemy</button>
            <style jsx>{combatCss}</style>
        </div>
    )
}

function Encounter(props) {
    const { id } = props
    const basePath = ['encounters', id]
    const [combat, setCombat] = useState(false)

    function toggleCombat() {
        if (typeof window === 'undefined') return
        let campaign = JSON.parse(localStorage.getItem('campaign'))
        campaign.encounters[id][2] = []
        localStorage.setItem('campaign', JSON.stringify(campaign))
        setCombat(!combat)
    }

    function handlePreexistingCombat() {
        if (typeof window === 'undefined') return
        const campaign = JSON.parse(localStorage.getItem('campaign'))
        if (campaign.encounters[id][2] && campaign.encounters[id][2].length > 0) setCombat(true)
    }

    useEffect(() => {
        handlePreexistingCombat()
    }, [])
    
    return (
        <>
            <div className='elementGroup'>
                <div className='title'>
                    <label>Encounter {parseInt(id) + 1}: </label>
                </div>
                <div className='input'>
                    <CampaignSimpleInput path={basePath.concat(0)} placeholder='Encounter Label' />
                </div>
                <div className='input'>
                    <CampaignSimpleInput path={basePath.concat(1)} placeholder='Encounter Image URL' />
                </div>
                <button onClick={toggleCombat}>{combat ? 'Delete' : 'Add'} Combat</button>
                {combat && (
                    <Combat id={id} />
                )}
            </div>
            <style jsx>{elementGroupCss}</style>
        </>
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
        <>
            {set}
        </>
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
                <div className='inputSet'>
                    <InputSet set={set} setName={setName} />
                    <div className='addBtnContainer'>
                        <button className='addBtn' onClick={addToSet}>Add new {setName}</button>
                    </div>
                </div>
            )}
            <style jsx>{inputSetCss}</style>
        </div>
    )
}