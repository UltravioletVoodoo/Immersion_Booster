import InitiativeChar from "./initiativeChar"

export default function InitiativeTracker(props) {
    const { state, setState, isSmall } = props
    const { combatants, turn } = state.combat

    function deleter(id) {
        let newState = {... state}
        newState.combat.combatants.splice(id, 1)
        setState(newState)
    }

    let charList = []
    for (let charId in combatants) {
        charList.push(
            <InitiativeChar 
                key={charId}
                id={charId}
                playerName={combatants[charId].playerName}
                name={combatants[charId].name}
                myTurn={turn === parseInt(charId)}
                deleter={deleter}
                isSmall={isSmall}
            />
        )
    }
    
    return (
        <>
            {charList}
        </>
    )
}