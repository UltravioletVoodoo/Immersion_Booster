import ChooseSiteBtn from '../components/chooseSiteBtn'
import Head from 'next/head'
import Base from '../components/base'
import css from "styled-jsx/css"


const indexStyle = css`
.centered {
    text-align: center;
}
`

export default function Index() {
    return (
        <div className="centered pageContainer">
            <Base />
            <Head><title>Immersion Booster</title></Head>

            <h1>Hello World</h1>
            <div className='btn adminBtn'>
                <ChooseSiteBtn text="Admin Site" href="/admin" />
            </div>
            <div className='btn viewerBtn'>
                <ChooseSiteBtn text="Viewer Site" href="/viewer" />
            </div>
            <style jsx>{`
                .centered {
                    text-align: center;
                }
                .pageContainer {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100vw;
                    height: 100vh;
                    background-image: url("/ImmersionBoosterArt.png");
                    background-size: 100vw 100vh;
                }
                .btn {
                    position: absolute;
                    top: 60vh;
                }
                .adminBtn {
                    left: 33vw;
                }
                .viewerBtn {
                    left: 61vw;
                }
            `}</style>
        </div>
    )
}