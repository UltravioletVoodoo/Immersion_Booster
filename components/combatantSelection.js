import shorten from "../util/textShortener"

export default function CombatantSelection(props) {
    const { isSelected, onClick, combatant } = props
    const { name, health } = combatant

    const onClickHandler = () => onClick(name)

    return (
        <>
            <div className='combatantSelection' onClick={onClickHandler}>
                <span className='combatantSelectionText'>{shorten(name, 10)}</span>
                <span className='combatantSelectionText hp'>{health}</span>
            </div>
            <style jsx>{`
                .combatantSelection {
                    width: 100%;
                    height: 25px; 
                    background-color: ${isSelected ? 'darkgrey' : 'lightgray'};
                    position: relative;
                }  
                .combatantSelection:hover {
                    background-color: grey;
                }
                .combatantSelectionText {
                    font-size: 14px;
                    font-family: monospace;
                }
                .hp {
                    right: 0;
                    width: 30%;
                    text-align: right;
                    position: absolute;
                }
            `}</style>
        </>
    )
}