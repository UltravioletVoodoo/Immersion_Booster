import { useEffect, useState } from "react"
import css from "styled-jsx/css"


const imageFieldCss = css`
.centerImage {
    width: 40vw;
    height: 40vw;
    opacity: 0;
    transition: 1s;
}
.centerImage.show {
    opacity: 1;
}
`


export default function ImageField() {
    const [imageSource, setImageSource] = useState(null)
    const [fadeStyle, setFadeStyle] = useState('')

    
    function addImage(source) {
        function setAndShow() {
            setImageSource(source)
            setFadeStyle('show')
        }

        if (fadeStyle === '') {
            setAndShow()
            return
        }

        const transition = document.querySelector('.centerImage')
        function setAndShowAndRemoveTransition() {
            setAndShow()
            transition.removeEventListener('transitionend', setAndShowAndRemoveTransition)
        }
        transition.addEventListener('transitionend', setAndShowAndRemoveTransition)
        setFadeStyle('')
    }

    function deleteImage() {
        if (fadeStyle === '') return
        const transition = document.querySelector('.centerImage');

        function remove() {
            setImageSource('')
            setFadeStyle('')
            transition.removeEventListener('transitionend', remove)
        }
        
        transition.addEventListener('transitionend', remove)
        setFadeStyle('')
    }


    useEffect(() => {
        const addChannel = new BroadcastChannel("addCenterImage")
        const deleteChannel = new BroadcastChannel("deleteCenterImage")
        addChannel.onmessage = (e) => { addImage(e.data) }
        deleteChannel.onmessage = (e) => { deleteImage() }


        return () => {
            addChannel.close();
            deleteChannel.close();
        }
    })

    return (
        <div>
            <img className={`centerImage ${fadeStyle}`} src={imageSource}></img>
            <style jsx>{imageFieldCss}</style>
        </div>
    )
}