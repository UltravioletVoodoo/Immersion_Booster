import InitiativeChar from "./initiativeChar"

export default function InitiativeTracker(props) {
    const { combatants, turn } = props
    let charList = []
    for (let charId in combatants) {
        if (Array.isArray(combatants[charId])) { // Check if its a real player
            charList.push(
            <div key={charId}>
                <InitiativeChar id={charId} playerName={combatants[charId][0]} name={combatants[charId][1]} myTurn={turn === parseInt(charId)} />
            </div>)
        } else { // Its not a real player
            charList.push(
                <div key={charId}>
                    <InitiativeChar id={charId} name={combatants[charId]} myTurn={turn === parseInt(charId)} />
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