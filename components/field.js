import { useEffect, useState } from "react"
import css from "styled-jsx/css"


const imageFieldCss = css`
img,p {
    opacity: 0;
    transition: 1s;
}
.bigImage {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    height: 100%;
    position: absolute;
}
.bigImageLabel {
    color: yellow;
    font-size: 30px;
    margin: 0px;
}
.show {
    opacity: 1;
}
`


export default function Field(props) {
    const { fieldName, type='bigImage' } = props
    const [fieldValue, setFieldValue] = useState(null)
    const [fadeStyle, setFadeStyle] = useState('')

    
    function addField(value) {

        // If we are updating to what is already there, do nothing
        if (fieldValue === value) return;

        function setAndShow() {
            setFieldValue(value)
            setFadeStyle('show')
        }

        if (fadeStyle === '') {
            setAndShow()
            return
        }

        const transition = document.querySelector(`.${type}`)
        function setAndShowAndRemoveTransition() {
            setAndShow()
            transition.removeEventListener('transitionend', setAndShowAndRemoveTransition)
        }
        transition.addEventListener('transitionend', setAndShowAndRemoveTransition)
        setFadeStyle('')
    }

    function deleteField() {
        if (fadeStyle === '') return
        const transition = document.querySelector(`.${type}`);

        function remove() {
            setFieldValue('')
            setFadeStyle('')
            transition.removeEventListener('transitionend', remove)
        }
        
        transition.addEventListener('transitionend', remove)
        setFadeStyle('')
    }


    useEffect(() => {
        const addChannel = new BroadcastChannel(`add${fieldName}`)
        const deleteChannel = new BroadcastChannel(`delete${fieldName}`)
        addChannel.onmessage = (e) => { addField(e.data) }
        deleteChannel.onmessage = (e) => { deleteField() }


        return () => {
            addChannel.close();
            deleteChannel.close();
        }
    })


    switch(type) {
        case 'bigImage':
            return (
                <>
                    <img className={`bigImage ${fadeStyle}`} src={fieldValue}></img>
                    <style jsx>{imageFieldCss}</style>
                </>
            )
        case 'bigImageLabel':
            return (
                <>
                    <p className={`bigImageLabel ${fadeStyle}`}>{fieldValue}</p>
                    <style jsx>{imageFieldCss}</style>
                </>
            )
        default:
            return null
    }

}