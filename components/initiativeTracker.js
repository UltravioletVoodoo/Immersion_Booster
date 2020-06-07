import InitiativeChar from "./initiativeChar"

export default function InitiativeTracker(props) {
    const { state, isAdmin } = props
    const { combatants, turn } = state.combat

    let charList = []
    for (let charId in combatants) {
        charList.push(
            <InitiativeChar 
                key={charId}
                id={parseInt(charId)}
                playerName={combatants[charId].playerName}
                name={combatants[charId].name}
                myTurn={turn === parseInt(charId)}
                isAdmin={isAdmin}
            />
        )
    }
    
    return (
        <>
            {charList}
        </>
    )
}