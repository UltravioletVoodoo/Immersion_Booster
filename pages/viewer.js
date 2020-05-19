import Head from 'next/head'
import Base from '../components/base'
import css from "styled-jsx/css"
import Field from '../components/field'
import { useState, useEffect } from 'react'
import InitiativeTracker from '../components/initiativeTracker'
import { blankState } from '../util/placeholders'


const viewerCss = css`
.viewer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #2e2e2e;
}
.imageCombo {
    position: absolute;
    text-align: center;
    transition: 2s;
}
.encounterVariant {
    top: 5%;
    height: 90%;
    width: 100%;
}
.combatVariant {
    top: 50%;
    height: 50%;
    width: 40%;
    transform: translateY(-50%);
}
.comboImage {
    position: absolute;
    height: 80%;
    width: 100%;
}
.comboLabel {
    position: absolute;
    width: 100%;
    top: 85%;
}

.combatViewer {
    position: absolute;
    width: 50%;
    height: 80%;
    right: 10%;
    top: 10%;
    border: 1px solid white;
}
`

export default function Viewer() {
    const [state, setState] = useState(blankState)

    useEffect(() => {
        function handleState() {
            setState(JSON.parse(localStorage.getItem('state')))
        }
        handleState()
        window.addEventListener('storage', handleState)

        return () => {
            window.removeEventListener('storage', handleState)
        }
    }, [])

    const comboClasses = `imageCombo ${state.isCombat ? 'combat' : 'encounter'}Variant`

    return (
        <div className='viewer'>
            <Head>
                <title>Immersion Viewer</title>
            </Head>
            <Base />
            <div className={comboClasses}>
                <div className="comboImage">
                    <Field type='viewerImage' fieldValue={state.imageUrl} />
                </div>
                <div className='comboLabel'>
                    <Field type='viewerLabel' fieldValue={state.imageLabel} />
                </div>
            </div>
            {state.isCombat && (
                <div className='combatViewer'>
                    <InitiativeTracker combatants={state.combat.combatants} turn={state.combat.turn} />
                </div>
            )}
            <style jsx>{viewerCss}</style>
        </div>
    )
}