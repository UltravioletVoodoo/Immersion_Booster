import FieldEditor from "./fieldEditor"
import NextTurn from "./nextTurn"
import TitledBox from "./titledBox"

export default function GeneralControls(props) {
    const { state, setState } = props

    return (
        <>
            <TitledBox text='General Controls' small>
                <div className='controlsContainer'>
                    <div className='fieldContainer'>
                        <FieldEditor fieldName='imageUrl' state={state} setState={setState} placeholder='Image URL' />
                        <FieldEditor fieldName='imageLabel' state={state} setState={setState} placeholder='Image Label' />
                    </div>
                    <div className='nextTurnContainer'>
                        <NextTurn state={state} setState={setState} />
                    </div>
                </div>
            </TitledBox>
            <style jsx>{`
                .controlsContainer {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                .fieldContainer {
                    position: absolute;
                    width: 100%;
                    height: calc(75% - 15px);
                    top: 15px;
                }
                .nextTurnContainer {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translateX(-50%);
                }
            `}</style>
        </>
    )
}