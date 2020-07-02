import convertTypes from "./convertTypes";
import initiativeSort from "./initiativeSort";

export default function charPreProcessing(combatants) {
    // convert dice types to numbers
    combatants.map((c) => {
        c.initiative = convertTypes(c.initiative)
        c.health = convertTypes(c.health)
    })
    // sort characters based on initiative value
    combatants = initiativeSort(combatants)
    return combatants
}