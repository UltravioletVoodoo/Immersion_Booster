import useChangeHandler from '../hooks/useChangeHandler';
import { UNCHANGED, ABOUT_TO_CHANGE, JUST_CHANGED } from '../hooks/useChangeHandler';
import css from "styled-jsx/css";

const viewerLabelCss = css`
.viewerLabel {
    transition: 1s;
    color: yellow;
    font-size: 30px;
    margin: 0px;
}
.transition-in {
    opacity: 1;
}
.transition-out {
    opacity: 0;
}
`

export default function ViewerLabel(props) {
    const { text } = props
    const [state, labelText] = useChangeHandler(text, 1000)
    const transition = {
        [UNCHANGED]: 'viewerLabel',
        [ABOUT_TO_CHANGE]: 'viewerLabel transition-out',
        [JUST_CHANGED]: 'viewerLabel transition-in'
    }[state];

    return (
        <>
            <p className={transition}>{labelText}</p>
            <style jsx>{viewerLabelCss}</style>
        </>
    )
}