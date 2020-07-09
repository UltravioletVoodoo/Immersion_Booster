import deepCopy from "../util/deepcopy"
import MyButton from '../components/myButton'


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
        <MyButton text='Next Turn' onClick={incrementTurn} color='cyan' hoverColor='pink' />
    )
}