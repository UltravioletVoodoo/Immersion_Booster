import FieldEditor from "./fieldEditor"
import NextTurn from "./nextTurn"

export default function GeneralControls(props) {
    const { state, setState } = props

    return (
        <>
            <div className='generalControlsTitle'>
                <div className='generalControlsTitleText'>General Controls</div>
            </div>
            <div className='controlsContainer'>
                <div className='fieldContainer'>
                    <FieldEditor fieldName='imageUrl' state={state} setState={setState} placeholder='Image URL' />
                    <FieldEditor fieldName='imageLabel' state={state} setState={setState} placeholder='Image Label' />
                </div>
                <div className='nextTurnContainer'>
                    <NextTurn state={state} setState={setState} />
                </div>
            </div>
            <style jsx>{`
                .generalControlsTitle {
                    width: 100%;
                    height: 25px;
                    position: absolute;
                    text-align: center;
                    border-bottom: 1px solid black;
                }
                .generalControlsTitleText {
                    font-size: 16px;
                    position: absolute;
                    width: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .controlsContainer {
                    position: absolute;
                    width: 100%;
                    height: calc(100% - 25px);
                    top: 25px;
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
                    top: 75%;
                    transform: translateX(-50%);
                }
            `}</style>
        </>
    )
}