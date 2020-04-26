import css from "styled-jsx/css"
import Link from 'next/link'

const buttonStyle = css`
button {
    width: 40vw;
    height: 20vh;
    font-size: 30px;
}

button:hover {
    color: green;
    border: 1px solid green;
}
`

export default function ChooseSiteBtn(props) {
    const { text, href } = props
    return (
        <>
            <Link href={href}>
                <button>{text}</button>
            </Link>
            <style jsx>{buttonStyle}</style>
        </>
    )
}