import Head from 'next/head'
import Base from '../../components/base'
import css from "styled-jsx/css"
import { useState, useEffect } from 'react'
import { blankState } from '../../util/placeholders'
import Viewer from '../../components/viewer'


const viewerPageCss = css`
.viewerPage {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #2e2e2e;
}
`

export default function ViewerPage() {
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

    return (
        <div className='viewerPage'>
            <Head>
                <title>Immersion Viewer</title>
            </Head>
            <Base />
            <Viewer state={state} />
            <style jsx>{viewerPageCss}</style>
        </div>
    )
}