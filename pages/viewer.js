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
.CenterImage {
    position: fixed;
    top: 5vh;
    text-align: center;
    width: 100%;
}
.CenterImageLabel {
    position: fixed;
    top: 85vh;
    text-align: center;
    width: 100%;
}
`

export default function Viewer() {
    return (
        <div className='viewer'>
            <Head>
                <title>Immersion Viewer</title>
            </Head>
            <Base />
            <div className="CenterImage">
                <Field fieldName='CenterImage' type='image' />
            </div>
            <div className='CenterImageLabel'>
                <Field fieldName='CenterImageLabel' type='label' />
            </div>
            <style jsx>{viewerCss}</style>
        </div>
    )
}