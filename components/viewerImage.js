import useChangeHandler from "../hooks/useChangeHandler";
import { UNCHANGED, ABOUT_TO_CHANGE, JUST_CHANGED } from "../hooks/useChangeHandler";
import css from "styled-jsx/css"

const viewerImageCss = css`
.viewerImage {
    transition: 1s;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    height: 100%;
}
.transition-in {
    opacity: 1;
}
.transition-out {
    opacity: 0;
}
`

export default function ViewerImage(props) {
    const { imageSrc } = props
    const [state, imageUrl] = useChangeHandler(imageSrc, 1000)
    const transition = {
        [UNCHANGED]: "viewerImage",
        [ABOUT_TO_CHANGE]: "viewerImage transition-out",
        [JUST_CHANGED]: "viewerImage transition-in"
    }[state];
    
    return (
        <>
            <img className={transition} src={imageUrl}></img>
            <style jsx>{viewerImageCss}</style>
        </>
    )
}