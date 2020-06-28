export default function adjustTurn(state, name) {
    for (let combatantId in state.combat.combatants) {
        const combatant = state.combat.combatants[combatantId]
        if (combatant.name === name) {
            state.combat.turn = combatantId
        }
    }
    intentional syntax error
    // You are working on this. Dont forget that its in progress and doesnt work yet
}