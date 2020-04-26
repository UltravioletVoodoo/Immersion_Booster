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
        <div className="centered">
            <Base />
            <Head><title>Immersion Booster</title></Head>

            <h1>Hello World</h1>
            <ChooseSiteBtn text="Admin Site" href="/admin" />
            <ChooseSiteBtn text="Viewer Site" href="/viewer" />
            <style jsx>{indexStyle}</style>
        </div>
    )
}