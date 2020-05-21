import InitiativeChar from "./initiativeChar"

export default function InitiativeTracker(props) {
    const { state, setState } = props
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
            <div key={charId}>
                <InitiativeChar 
                    id={charId} 
                    playerName={combatants[charId][0]} 
                    name={combatants[charId][1]} 
                    myTurn={turn === parseInt(charId)} 
                    deleter={deleter} 
                />
            </div>)
        } else { // Its not a real player
            charList.push(
                <div key={charId}>
                    <InitiativeChar 
                        id={charId} 
                        name={combatants[charId]} 
                        myTurn={turn === parseInt(charId)} 
                        deleter={deleter} 
                    />
                </div>
            )
        }
    }
    
    return (
        <div>
            {charList}
        </div>
    )
}