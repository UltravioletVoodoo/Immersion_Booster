import { useEffect, useState } from "react"
import css from "styled-jsx/css"


const imageFieldCss = css`
img {
    width: 40vw;
    height: 40vw;
}
`


export default function ImageField() {
    const [imageSource, setImageSource] = useState(null)
    
    useEffect(() => {
        const bc = new BroadcastChannel("centerImage")
        bc.onmessage = (e) => {
            setImageSource(e.data)}

        return () => {
            bc.close();
        }
    })

    return (
        <div>
            <img src={imageSource}></img>
            <style jsx>{imageFieldCss}</style>
        </div>
    )
}