import FieldEditor from "./fieldEditor"
import NextTurn from './nextTurn'
import SelectedCharacterControls from "./selectedCharacterControls"

export default function LiveEditors(props) {
    const { state, setState } = props

    return (
        <>
            <div className='liveEditor liveControls'>
                <FieldEditor fieldName='imageUrl' placeholder='Image URL' state={state} setState={setState} />
                <FieldEditor fieldName="imageLabel" placeHolder='Label Text' state={state} setState={setState} />
                {state.isCombat && (
                    <NextTurn state={state} setState={setState} />
                )}
            </div>
            <div className='liveEditor selectedCharControls'>
                <SelectedCharacterControls />
            </div>
            <style jsx>{`
                .liveEditor {
                    position: absolute;
                    width: 50%;
                    height: 100%;
                    top: 0;
                    border: 1px solid black;
                }
                .liveControls {
                    left: 0;
                }
                .selectedCharControls {
                    left: 50%;
                }
            `}</style>
        </>
    )
}