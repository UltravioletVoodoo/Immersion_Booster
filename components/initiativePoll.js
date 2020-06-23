export default function InitiativePoll(props) {
    const { state, setState, startCombat } = props

    return (
        <>
            <div>
                <p>Initiative Polling. Ask for each player character in order THEN start combat by calling the function passed to us</p>
                <button onClick={startCombat}>Start Combat</button>
            </div>
            <style jsx>{`

            `}</style>
        </>
    )
}