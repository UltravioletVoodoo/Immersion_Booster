import Head from 'next/head'
import Base from '../components/base'
import css from "styled-jsx/css"
import Field from '../components/field'
import { useState, useEffect } from 'react'
import InitiativeTracker from '../components/initiativeTracker'


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
    const [combat, setCombat] = useState(null)
    let c

    useEffect(() => {
        c = new BroadcastChannel('setCombat');
        c.onmessage = (e) => { setCombat(e.data) }

        return () => {
            c.close()
        }
    }, [])

    const comboClasses = `imageCombo ${combat ? 'combat' : 'encounter'}Variant`

    return (
        <div className='viewer'>
            <Head>
                <title>Immersion Viewer</title>
            </Head>
            <Base />
            <div className={comboClasses}>
                <div className="comboImage">
                    <Field fieldName='CenterImage' type='bigImage' />
                </div>
                <div className='comboLabel'>
                    <Field fieldName='CenterImageLabel' type='bigImageLabel' />
                </div>
            </div>
            {combat && (
                <div className='combatViewer'>
                    <InitiativeTracker enemies={combat} />
                </div>
            )}
            <style jsx>{viewerCss}</style>
        </div>
    )
}