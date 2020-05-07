import css from "styled-jsx/css"
import { useEffect } from "react"

const previewCss = css`
.preview {
    position: relative;
    height: 100%;
    width: 100%;
    text-align: center;
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
}
.preview:hover {
    background-color: blue;
}
.previewLabel {
    font-size: 20px;
    position: absolute;
    top: 0;
    width: 100px;
    left: calc(50% - 50px);
}
.previewImage {
    height: 100%;
    width: auto;
}
`

export default function Preview(props) {
    const { label, image } = props
    let labelChannel, imageChannel

    function broadcast() {
        labelChannel.postMessage(label)
        imageChannel.postMessage(image)
    }

    useEffect(() => {
        labelChannel = new BroadcastChannel('addCenterImageLabel')
        imageChannel = new BroadcastChannel('addCenterImage')

        return () => {
            labelChannel.close()
            imageChannel.close()
        }
    }, [])

    return (
        <>
            <div className='preview' onClick={broadcast}>
                <label className='previewLabel'>{label}</label>
                <img className='previewImage' src={image}></img>
            </div>
            <style jsx>{previewCss}</style>
        </>
    )
}