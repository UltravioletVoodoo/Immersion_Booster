export default function InitiativeChar(props) {
    const { id, name, playerName } = props

    return (
        <div>
            <p>{parseInt(id) + 1}: {name}{playerName ? ` (${playerName})` : ''}</p>
        </div>
    )
}