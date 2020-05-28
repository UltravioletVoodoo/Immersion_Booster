import { useState, useRef, useEffect } from "react"




export default function Console(props) {
    const { state, setState } = props
    const [history, setHistory] = useState([])
    const [inputValue, setInputValue] = useState('')

    function saveToHistory(response) {
        setHistory(history.concat(<p key={history.length}>{response}</p>))
    }

    function computeResponse() {
        saveToHistory(inputValue)
        setInputValue('')
    }

    function onInputChange(e) {
        const newValue = e.target.value
        setInputValue(newValue)
    }

    function keyPressHandler(e) {
        if (e.key === 'Enter') {
            computeResponse()
        }
    }

    useEffect(() => {
        window.addEventListener('keypress', keyPressHandler)
        
        return () => {
            window.removeEventListener('keypress', keyPressHandler)
        }
    }, [inputValue])

    return (
        <>
            <div className='consoleBase console'>
                <div className='outputHistory'>
                    {history}
                </div>
                <div className='consoleBase inputBox'>
                    <input value={inputValue} onChange={onInputChange}></input>
                </div>
            </div>
            <style jsx>{`
                .console {
                    color: lime;
                    width: 100%
                }
                .consoleBase {
                    width: 100%;
                    font-family: monospace;
                }
                .outputHistory {
                    
                }
                .inputBox {
                    position: absolute;
                    bottom: 0;
                    height: 25px;
                    padding-bottom: 10px;
                }
                .inputBox > input {
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </>
    )
}