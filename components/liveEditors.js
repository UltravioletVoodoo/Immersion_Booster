import SelectedCharacterControls from "./selectedCharacterControls"
import GeneralControls from "./generalControls"
import TitledBox from "./titledBox"

export default function LiveEditors(props) {
    const { state, setState } = props

    return (
        <>
            <TitledBox text='Live Editors'>
                <div className='liveEditor liveControls'>
                    <GeneralControls state={state} setState={setState} />
                </div>
                <div className='liveEditor selectedCharControls'>
                    <SelectedCharacterControls state={state} setState={setState} />
                </div>
            </TitledBox>
            <style jsx>{`
                .liveEditor {
                    position: absolute;
                    width: 50%;
                    height: 100%;
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