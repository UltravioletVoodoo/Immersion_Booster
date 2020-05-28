import FieldEditor from "./fieldEditor"
import NextTurn from './nextTurn'
import Console from "./console"

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
            <div className='liveEditor liveConsole'>
                <Console state={state} setState={setState} />
            </div>
            <style jsx>{`
                .liveEditor {
                    position: absolute;
                    width: 50%;
                    height: 100%;
                    top: 0;
                }
                .liveControls {
                    left: 0;
                }
                .liveConsole {
                    left: 50%;
                    background-color: black;
                }
            `}</style>
        </>
    )
}