import deepCopy from "../util/deepcopy"


export default function NextTurn(props) {
    const {state, setState} = props
    
    function incrementTurn() {
        const newState = deepCopy(state)
        if (newState.combat.turn + 1 >= newState.combat.combatants.length) {
            newState.combat.turn = 0
        } else {
            newState.combat.turn = newState.combat.turn + 1
        }
        setState(newState)
    }

    return (
        <button onClick={incrementTurn}>Next Turn</button>
    )
}