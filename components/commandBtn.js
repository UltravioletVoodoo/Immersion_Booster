import css from "styled-jsx/css"
import { useEffect } from "react";

const commandBtnCss = css`
.commandBtn {
    height: 50px;
}
.commandBtn:hover {
    border: 1px solid red;
    color: red;
}
`

export default function CommandBtn(props) {
    const { text, channelName } = props
    let c

    function broadcast() {
        c.postMessage('')
    }

    useEffect(() => {
        c = new BroadcastChannel(channelName)
        
        return () => {
            c.close()
        }
    }, [])

    return (
        <>
            <button className='commandBtn' onClick={broadcast}>{text}</button>
            <style jsx>{commandBtnCss}</style>
        </>
    )
}