import convertTypes from "./convertTypes"


export default function initiativeSort(combatants) {
    combatants.sort((a, b) => {return b.initiative - a.initiative})
    return combatants
}