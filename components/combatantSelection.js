export default function CombatantSelection(props) {
    const { isSelected, onClick, combatant } = props
    const { name } = combatant

    const onClickHandler = () => onClick(name)

    return (
        <>
            <div className='combatantSelection' onClick={onClickHandler}>
                <span>{name}</span>
            </div>
            <style jsx>{`
                .combatantSelection {
                    width: 100%;
                    height: 25px;
                    font-size: 16px;
                    background-color: ${isSelected ? 'red' : 'blue'};
                }  
                .combatantSelection:hover {
                    background-color: purple;
                }  
            `}</style>
        </>
    )
}