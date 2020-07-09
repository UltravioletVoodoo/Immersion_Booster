import PreviewSet from "./previewSet"
import TitledBox from "./titledBox"


export default function TemplateSelector(props) {
    const { encounters, state, setState } = props

    return (
        <>
            <TitledBox text='Template Selector' leftBorder small>
                <PreviewSet set={encounters} state={state} setState={setState} />
            </TitledBox>
            <style jsx>{`
            `}</style>
        </>
    )
}