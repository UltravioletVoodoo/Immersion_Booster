import Head from 'next/head'
import Base from '../components/base'
import css from "styled-jsx/css"
import ImageField from '../components/imageField'


const viewerCss = css`
.viewer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #2e2e2e;
}
.ImageField {
    position: absolute;
    top: calc(50vh - 20vw);
    left: 30vw;
}
`

export default function Viewer() {
    return (
        <div className='viewer'>
            <Head>
                <title>Immersion Viewer</title>
            </Head>
            <Base />
            <h1>Viewer Page</h1>
            <div className="ImageField">
                <ImageField />
            </div>
            <style jsx>{viewerCss}</style>
        </div>
    )
}