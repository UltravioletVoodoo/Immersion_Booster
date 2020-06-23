import SelectedCharacterControls from "./selectedCharacterControls"
import GeneralControls from "./generalControls"

export default function LiveEditors(props) {
    const { state, setState, startCombat } = props

    return (
        <>
            <div className='liveEditorsTitle'>
                <div className='liveEditorsTitleText'>Live Editors</div>
            </div>
            <div className='liveEditor liveControls'>
                <GeneralControls state={state} setState={setState} />
            </div>
            <div className='liveEditor selectedCharControls'>
                <SelectedCharacterControls state={state} setState={setState} startCombat={startCombat} />
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