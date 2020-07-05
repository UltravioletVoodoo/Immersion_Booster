import { useState, useEffect } from "react"
import CampaignSimpleInput from "./campaignSimpleInput"
import css from "styled-jsx/css"
import { blankCombatant, blankEncounter } from "../util/placeholders"
import deepCopy from "../util/deepcopy"


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
    const { id, deleter } = props
    const basePath = ['players', id]
    const deleteMe = () => deleter(id)

    return (
        <>
            <div className='elementGroup'>
                <div className='title'>
                    <label>Player {parseInt(id) + 1}: </label>
                </div>
                <div className='input'>
                    <CampaignSimpleInput path={basePath.concat('playerName')} placeholder='Player Name' label='Player' />
                </div>
                <div className='input'>
                    <CampaignSimpleInput path={basePath.concat('name')} placeholder='Character Name' label='Character' />
                </div>
                <button onClick={deleteMe}>Delete</button>
            </div>
            <style jsx>{elementGroupCss}</style>
        </>
    )
}

function Combat(props) {
    const { id } = props
    const [baddies, setBaddies] = useState([])

    let baddieList = []
    for (let baddie in baddies) {
        baddieList[baddie] = (
            <div key={baddie}>
                <CampaignSimpleInput path={['encounters', id, 'combatants', baddie, 'name']} placeholder='Enemy Name' label='Name' />
                <CampaignSimpleInput path={['encounters', id, 'combatants', baddie, 'health']} placeholder='HP value (ex: 2d4 + 3)' label='HP' />
                <CampaignSimpleInput path={['encounters', id, 'combatants', baddie, 'initiative']} placeholder='Initiative value (ex: d20 + 2)' label='Initiative' />
            </div>
        )
    }

    function addBaddie() {
        const newBaddie = deepCopy(blankCombatant)
        newBaddie.type = 'enemy'
        setBaddies(baddies.concat(newBaddie))

        // Make room in local storage
        let campaign = JSON.parse(localStorage.getItem('campaign'))
        campaign.encounters[id].combatants.push(newBaddie)
        localStorage.setItem('campaign', JSON.stringify(campaign))
    }

    function loadBaddies() {
        if (typeof window === 'undefined') return
        setBaddies(JSON.parse(localStorage.getItem('campaign')).encounters[id].combatants)
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
    const { id, deleter } = props
    const basePath = ['encounters', id]
    const [combat, setCombat] = useState(false)
    const deleteMe = () => deleter(id)

    function toggleCombat() {
        if (typeof window === 'undefined') return
        let campaign = JSON.parse(localStorage.getItem('campaign'))
        campaign.encounters[id].combatants = []
        localStorage.setItem('campaign', JSON.stringify(campaign))
        setCombat(!combat)
    }

    function handlePreexistingCombat() {
        if (typeof window === 'undefined') return
        const campaign = JSON.parse(localStorage.getItem('campaign'))
        if (campaign.encounters[id].combatants.length > 0) setCombat(true)
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
                    <CampaignSimpleInput path={basePath.concat('imageLabel')} placeholder='Encounter Label' />
                </div>
                <div className='input'>
                    <CampaignSimpleInput path={basePath.concat('imageUrl')} placeholder='Encounter Image URL' />
                </div>
                <div className='input'>
                    <CampaignSimpleInput path={basePath.concat('soundEffect')} placeholder='Sound Effect URL' />
                </div>
                <button onClick={toggleCombat}>{combat ? 'Delete' : 'Add'} Combat</button>
                <button onClick={deleteMe}>Delete</button>
                {combat && (
                    <Combat id={id} />
                )}
            </div>
            <style jsx>{elementGroupCss}</style>
        </>
    )
}

function getAppropriateComponent(setName, id, deleter) {
    switch(setName) {
        case 'players': return <Player key={id} id={id} deleter={deleter} />
        case 'encounters': return <Encounter key={id} id={id} deleter={deleter} />
        default: return <p>Oops. No appropriate set found for {setName}</p>
    }
}


function InputSet(props) {
    const { set, setName, deleter } = props
    for (let setElementId in set) {
        set[setElementId] = (getAppropriateComponent(setName, setElementId, deleter))
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
        switch(setName) {
            case 'players':
                const newPlayer = deepCopy(blankCombatant)
                newPlayer.type = 'player'
                campaign['players'].push(newPlayer)
                break
            case 'encounters':
                campaign['encounters'].push(deepCopy(blankEncounter))
                break
            default:
                throw `Campaign input set must be one of 'players'|'encounters'. ${setName} given`

        }
        localStorage.setItem('campaign', JSON.stringify(campaign))
    }

    function removeFromSet(index) {
        if (typeof window === 'undefined') return
        let campaign = JSON.parse(localStorage.getItem('campaign'))
        campaign[setName].splice(index, 1)
        localStorage.setItem('campaign', JSON.stringify(campaign))
        setSet(campaign[setName])
    }

    useEffect(() => {
        loadSet()
    }, [])
    
    return (
        <div>
            {set && (
                <div className='inputSet'>
                    <InputSet set={set} setName={setName} deleter={removeFromSet} />
                    <div className='addBtnContainer'>
                        <button className='addBtn' onClick={addToSet}>Add new {setName}</button>
                    </div>
                </div>
            )}
            <style jsx>{inputSetCss}</style>
        </div>
    )
}