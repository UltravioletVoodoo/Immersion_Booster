import Head from 'next/head'
import Base from '../../components/base'
import css from "styled-jsx/css"
import FieldEditor from '../../components/fieldEditor'
import TemplateSelector from '../../components/templateSelector'
import { useState, useEffect } from 'react'
import { blankState } from '../../util/placeholders'
import NextTurn from '../../components/nextTurn'
import Viewer from '../../components/viewer'


const AdminCss = css`
.manualEditors {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 50vh;
    right: 50vw;
    background-color: grey;
}
.templateSelector {
    position: fixed;
    top: 0;
    left: 50vw;
    right: 0;
    bottom: 0;
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
            <h1>Admin Page</h1>
            <div className='manualEditors'>
                <FieldEditor fieldName='imageUrl' placeHolder='Image URL' state={state} setState={setState} />
                <FieldEditor fieldName="imageLabel" placeHolder='Label Text' state={state} setState={setState} />
                <div>
                    <NextTurn state={state} setState={setState} />
                </div>
            </div>
            <div className='viewerPreview'>
                <Viewer state={state} />
            </div>
            <div className='templateSelector'>
                <TemplateSelector state={state} setState={setState} />
            </div>
            <style jsx>{AdminCss}</style>
        </div>
    )
}