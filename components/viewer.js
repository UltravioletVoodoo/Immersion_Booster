import ViewerImage from "./viewerImage";
import ViewerLabel from "./viewerLabel";
import InitiativeTracker from "./initiativeTracker";
import css from "styled-jsx/css"

const viewerCss = css`
.imageCombo {
    position: absolute;
    text-align: center;
    transition: 2s;
}
.encounterVariant {
    top: 5%;
    height: 90%;
    width: 100%;
}
.combatVariant {
    top: 50%;
    height: 50%;
    width: 40%;
    transform: translateY(-50%);
}
.comboImage {
    position: absolute;
    height: 80%;
    width: 100%;
}
.comboLabel {
    position: absolute;
    width: 100%;
    top: 85%;
}
.combatViewer {
    position: absolute;
    width: 50%;
    height: 80%;
    right: 10%;
    top: 10%;
    border: 1px solid white;
}
`

export default function Viewer(props) {
    const { state, setState, isSmall } = props
    const comboClasses = `imageCombo ${state.isCombat ? 'combat' : 'encounter'}Variant`
    return (
        <>
            <div className={comboClasses}>
                <div className='comboImage'>
                    <ViewerImage imageSrc={state.imageUrl} />
                </div>
                <div className='comboLabel'>
                    <ViewerLabel text={state.imageLabel} isSmall={isSmall} />
                </div>
            </div>
            {state.isCombat && (
                <div className='combatViewer'>
                    <InitiativeTracker state={state} setState={setState} isSmall={isSmall} />
                </div>
            )}
            <style jsx>{viewerCss}</style>
        </>
    )
}