import { useState } from "react"
import { blankCombatant } from "../util/placeholders"
import deepCopy from "../util/deepcopy"

export default function InsertionForm(props) {
    const { state, id, insert } = props
    const [name, setName] = useState('')
    const [hp, setHp] = useState('')

    function nameChange(e) {
        const newValue = e.target.value ? e.target.value : ''
        setName(newValue)
    }

    function hpChange(e) {
        const newValue = e.target.value ? e.target.value : ''
        setHp(newValue)
    }
    

    function handleInsertion() {
        const initiative = state.combat.combatants.length === id ? state.combat.combatants[id - 1].initiative : state.combat.combatants[id].initiative

        let combatant = deepCopy(blankCombatant)
        combatant.name = name
        combatant.type = 'enemy'
        combatant.health = hp
        combatant.initiative = initiative
        insert(id, combatant)
    }


    return (
        <>
            <div>
                <p>Please Enter information on the new combatant</p>
                <label>Name</label><input value={name} onChange={nameChange} placeholder='Name'></input>
                <label>HP</label><input value={hp} onChange={hpChange} placeholder='Hit Points'></input>
                <button onClick={handleInsertion}>Insert New Combatant</button>
            </div>
            <style jsx>{`

            `}</style>
        </>
    )
}