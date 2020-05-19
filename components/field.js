import { useEffect, useState } from "react"
import css from "styled-jsx/css"


const imageFieldCss = css`
img,p {
    opacity: 0;
    transition: 1s;
}
.viewerImage {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    height: 100%;
    position: absolute;
}
.viewerLabel {
    color: yellow;
    font-size: 30px;
    margin: 0px;
}
.show {
    opacity: 1;
}
`


export default function Field(props) {
    const { type, fieldValue } = props
    const [fadeStyle, setFadeStyle] = useState('')
    const [stateValue, setStateValue] = useState(null)

    function fadeInNewValue() {
        setStateValue(fieldValue)
        setFadeStyle('show')
    }

    function fadeAndSwap() {
        const element = document.querySelector(`.${type}`)
        function fadeInAndRemoveListener() {
            fadeInNewValue(fieldValue)
            element.removeEventListener('transitionend', fadeInAndRemoveListener)
        }
        element.addEventListener('transitionend', fadeInAndRemoveListener)
        setFadeStyle('')
    }

    function fadeOutOldValue() {
        const element = document.querySelector(`.${type}`)
        function removeListeners() {
            element.removeEventListener('transitionend', removeListeners)
            setStateValue('')
        }
        element.addEventListener('transitionend', removeListeners)
        setFadeStyle('')
    }

    function updateValue() {
        if (fieldValue === '') {
            fadeOutOldValue()
        } else {
            if (!stateValue || stateValue === '') { // There is no current value, so just fade in
                fadeInNewValue()
            } else { // There is a current value, fade out then fade in the new value
                fadeAndSwap()
            }
        }
    }

    useEffect(() => {
        if (stateValue !== fieldValue) { // We've been passed a new value. We need to animate the change
            updateValue()
        }
    })

    switch(type) {
        case 'viewerImage':
            return (
                <>
                    <img className={`viewerImage ${fadeStyle}`} src={stateValue}></img>
                    <style jsx>{imageFieldCss}</style>
                </>
            )
        case 'viewerLabel':
            return (
                <>
                    <p className={`viewerLabel ${fadeStyle}`}>{stateValue}</p>
                    <style jsx>{imageFieldCss}</style>
                </>
            )
        default:
            return null
    }

}