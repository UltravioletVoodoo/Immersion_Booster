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
    transition: 0.5s;
}
.preview:hover {
    box-shadow: 0 0 10px black;
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
.actionButton {
    width: 25%;
    height: 25%;
    top: 50%;
    z-index: 2;
    position: absolute;
    transform: translate(-50%, -50%);
    transition: 0.5s;
    opacity: 0.2;
}
.actionButton:hover {
    opacity: 1;
}
.encounterStart {
    left: 25%;
}
.combatStart {
    left: 75%;
}
`

export default function Preview(props) {
    const { label, image } = props
    let labelChannel, imageChannel

    function broadcastEncounter() {
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
            <div className='preview'>
                <label className='previewLabel'>{label}</label>
                <img className='previewImage' src={image}></img>
                <img className='encounterStart actionButton' src='/scroll-quill.svg' onClick={broadcastEncounter}></img>
                <img className='combatStart actionButton' src='/swords-emblem.svg'></img>
            </div>
            <style jsx>{previewCss}</style>
        </>
    )
}