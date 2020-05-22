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
        if (Array.isArray(combatants[charId])) { // Check if its a real player
            charList.push(
                <InitiativeChar
                    key={charId} 
                    id={charId} 
                    playerName={combatants[charId][0]} 
                    name={combatants[charId][1]} 
                    myTurn={turn === parseInt(charId)} 
                    deleter={deleter} 
                    isSmall={isSmall}
                />
            )
        } else { // Its not a real player
            charList.push(
                <InitiativeChar
                    key={charId} 
                    id={charId} 
                    name={combatants[charId]} 
                    myTurn={turn === parseInt(charId)} 
                    deleter={deleter} 
                    isSmall={isSmall}
                />
            )
        }
    }
    
    return (
        <>
            {charList}
        </>
    )
}