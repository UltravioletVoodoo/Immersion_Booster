import Head from 'next/head'
import Base from '../components/base'
import css from "styled-jsx/css"
import Field from '../components/field'


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
    position: fixed;
    text-align: center;
}
.encounterVariant {
    top: 5%;
    height: 90%;
    width: 100%;
}
.combatVariant {
    top: 50%;
    height: 50%;
    width: 33%;
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
`

export default function Viewer() {
    const encounter = true;


    const comboClasses = `imageCombo ${encounter ? 'encounter' : 'combat'}Variant`

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
            <style jsx>{viewerCss}</style>
        </div>
    )
}