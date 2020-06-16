import FieldEditor from "./fieldEditor"
import NextTurn from './nextTurn'
import SelectedCharacterControls from "./selectedCharacterControls"

export default function LiveEditors(props) {
    const { state, setState } = props

    return (
        <>
            <div className='liveEditorsTitle'>
                <div className='liveEditorsTitleText'>Live Editors</div>
            </div>
            <div className='liveEditor liveControls'>
                <FieldEditor fieldName='imageUrl' placeholder='Image URL' state={state} setState={setState} />
                <FieldEditor fieldName="imageLabel" placeHolder='Label Text' state={state} setState={setState} />
                {state.isCombat && (
                    <NextTurn state={state} setState={setState} />
                )}
            </div>
            <div className='liveEditor selectedCharControls'>
                <SelectedCharacterControls state={state} setState={setState} />
            </div>
            <style jsx>{`
                .liveEditor {
                    position: absolute;
                    width: 50%;
                    height: calc(100% - 50px);
                    top: 50px;
                    border: 1px solid black;
                }
                .liveControls {
                    left: 0;
                }
                .selectedCharControls {
                    left: 50%;
                }
                .liveEditorsTitle {
                    text-align: center;
                    width: 100%;
                    position: absolute;
                    height: 50px;
                }
                .liveEditorsTitleText {
                    font-size: 25px;
                    top: 50%;
                    transform: translateY(-50%);
                    position: absolute;
                    width: 100%;
                }
            `}</style>
        </>
    )
}