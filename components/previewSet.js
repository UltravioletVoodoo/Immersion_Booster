import Preview from "./preview"
import css from "styled-jsx/css"

const previewSetCss = css`
.previewSet {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
}
`

const previewSetElementCss = css`
.previewSetElement {
    position: relative;
    height: 100px;
    width: 100px;
    left: 50%;
    /* transform: translateX(-50%); */
    margin-bottom: 10px;
}
`

function PreviewSetElement(props) {
    const { id, label, image, enemies, state, setState } = props
    return (
        <>
            <div className='previewSetElement'>
                <Preview 
                    key={id} 
                    label={label} 
                    image={image} 
                    enemies={enemies} 
                    state={state} 
                    setState={setState}
                />
            </div>
            <style jsx>{previewSetElementCss}</style>
        </>
    )
}

export default function PreviewSet(props) {
    const { set, state, setState } = props
    let previews = []
    for (let previewId in set) {
        previews[previewId] = (
        <PreviewSetElement 
            key={previewId} 
            id={previewId} 
            label={set[previewId].imageLabel} 
            image={set[previewId].imageUrl} 
            enemies={set[previewId].combatants} 
            state={state} 
            setState={setState}
            />
        )
    }

    return (
        <>
            <div className='previewSet'>
                {previews}
            </div>
            <style jsx>{previewSetCss}</style>
        </>
    )
}