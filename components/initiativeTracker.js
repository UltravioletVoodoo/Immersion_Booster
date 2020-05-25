import InitiativeChar from "./initiativeChar"

export default function InitiativeTracker(props) {
    const { state, setState, isSmall } = props
    const { combatants, turn } = state.combat

    function killCombatant(id) {
        let newState = {... state}
        newState.combat.combatants[id].isAlive = false
        setState(newState)
    }

    function deleter(id) {
        let newState = {... state}

        // Handle 2 edge cases (last turn character dies on its turn, character above turn dies)
        console.log(turn, id, combatants.length, combatants.length - 1)
        if (turn === id && id === combatants.length - 1) {
            newState.combat.turn = 0
        } else if (id < turn) {
            newState.combat.turn -= 1
        }
        newState.combat.combatants.splice(id, 1)

        setState(newState)
    }

    let charList = []
    for (let charId in combatants) {
        charList.push(
            <InitiativeChar 
                key={charId}
                id={parseInt(charId)}
                playerName={combatants[charId].playerName}
                name={combatants[charId].name}
                myTurn={turn === parseInt(charId)}
                killer={killCombatant}
                deleter={deleter}
                isSmall={isSmall}
                isAlive={combatants[charId].isAlive}
            />
        )
    }
    
    return (
        <>
            {charList}
        </>
    )
}