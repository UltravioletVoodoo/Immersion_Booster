import ChooseSiteBtn from '../components/chooseSiteBtn'
import Head from 'next/head'
import Base from '../components/base'
import css from "styled-jsx/css"
import { useState, useEffect } from 'react'


const indexStyle = css`
.centered {
    text-align: center;
}
`

export default function Index() {
    const [dimensions, setDimensions] = useState({x: 1, y: 1})

    useEffect(() => {
        function handleResize() {
            if (typeof window === 'undefined') return
            setDimensions({x: window.innerWidth, y: window.innerHeight})
        }
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const scaleFactor = Math.min(dimensions.x / 1920, dimensions.y / 1080)
    const width = 1920 * scaleFactor
    const height = 1080 * scaleFactor

    return (
        <>
            <div className='background'></div>
            <div className="centered pageContainer">
                <Base />
                <Head><title>Immersion Booster</title></Head>
                <div className='btn adminBtn'>
                    <ChooseSiteBtn text="Admin" href="/admin" />
                </div>
                <div className='btn viewerBtn'>
                    <ChooseSiteBtn text="Viewer" href="/viewer" />
                </div>
            </div>
            <style jsx>{`
                .background {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: darkcyan;
                }
                .centered {
                    text-align: center;
                }
                .pageContainer {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    width: ${width}px;
                    height: ${height}px;
                    background-image: url("/ImmersionBoosterArt.png");
                    background-size: ${width}px ${height}px;
                    background-color: darkslategray;
                }
                .btn {
                    position: absolute;
                    top: 60%;
                    width: 10%;
                    height: 10%;
                }
                .adminBtn {
                    left: 27%;
                }
                .viewerBtn {
                    left: 53%;
                }
            `}</style>
        </>
    )
}