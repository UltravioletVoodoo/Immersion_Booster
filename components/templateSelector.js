import Link from "next/link"
import PreviewSet from "./previewSet"
import TitledBox from "./titledBox"


export default function TemplateSelector(props) {
    const { encounters, state, setState } = props

    return (
        <>
            <TitledBox text='Template Selector' leftBorder>
                <PreviewSet set={encounters} state={state} setState={setState} />
            </TitledBox>
            <style jsx>{`
            `}</style>
        </>
    )
}