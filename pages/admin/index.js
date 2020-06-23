import Head from 'next/head'
import Base from '../../components/base'
import css from "styled-jsx/css"
import TemplateSelector from '../../components/templateSelector'
import { useState, useEffect } from 'react'
import { blankState } from '../../util/placeholders'
import Viewer from '../../components/viewer'
import CampaignNotes from '../../components/campaignNotes'
import LiveEditors from '../../components/liveEditors'


const AdminCss = css`
.manualEditors {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 50vh;
    right: 50vw;
}
.templateSelector {
    position: fixed;
    top: 0;
    left: 50vw;
    right: 0;
    bottom: 50vh;
    background-color: white;
}
.viewerPreview {
    position: fixed;
    top: 50vh;
    left: 0;
    right: 50vw;
    bottom: 0;
    background-color: darkcyan;
}
.campaignNotes {
    position: fixed;
    top: 50vh;
    left: 50vw;
    right: 0;
    bottom: 0;
}
`

function updateStoredState(state) {
    if (typeof window === 'undefined') return
    localStorage.setItem('state', JSON.stringify(state))
}

function loadStoredState(setState) {
    if (typeof window === 'undefined') return
    const newState = JSON.parse(localStorage.getItem('state'))
    if (newState) {
        setState(newState)
    }
}


export default function Admin() {
    const [state, setState] = useState(blankState)
    
    function startCombat() {
        const newState = {... state}
        newState.isCombat = true
        setState(newState)
    }
    
    useEffect(() => {
        loadStoredState(setState)
    }, [])
    
    useEffect(() => {
        updateStoredState(state)
    }, [state])

    return (
        <div>
            <Head>
                <title>Immersion Admin</title>
            </Head>
            <Base />
            <div className='manualEditors'>
                <LiveEditors state={state} setState={setState} startCombat={startCombat} />
            </div>
            <div className='viewerPreview'>
                <Viewer state={state} isAdmin={true} />
            </div>
            <div className='templateSelector'>
                <TemplateSelector state={state} setState={setState} startCombat={startCombat} />
            </div>
            <div className='campaignNotes'>
                <CampaignNotes />
            </div>
            <style jsx>{AdminCss}</style>
        </div>
    )
}