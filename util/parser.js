import { blankHistory } from "./placeholders"

export default function parser(command, setInputValue, history, setHistory, state, setState) {
    
    
    if (/clear/.test(command)) {
        clearConsole(history, setHistory)
        saveToHistory(
            history,
            setHistory,
            command,
            'console cleared'
        )
    }


    else if (/reset/.test(command)) resetConsole(setHistory)


    else {
        saveToHistory(
            history,
            setHistory,
            command,
            `Command: '${command}' is not recognized. Type 'help' for a list of available commands`
        )
    }
    clearInput(setInputValue)
}


// Meta functions
function clearConsole(history, setHistory) {
    setHistory({consoleHistory: [], commandHistory: history.commandHistory})
}

function resetConsole(setHistory) {
    setHistory({... blankHistory})
}

function saveToHistory(history, setHistory, command, response) {
    setHistory({
        consoleHistory: history.consoleHistory.concat({input: command, response: response}),
        commandHistory: history.commandHistory.concat(command)
    })
}

function clearInput(setInputValue) {
    setInputValue('')
}