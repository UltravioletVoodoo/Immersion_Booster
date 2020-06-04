import { useState, useRef, useEffect } from "react"
import parser from "../util/parser"
import { keycodes } from "../util/keycodes"
import { blankHistory } from "../util/placeholders"




export default function Console(props) {
    const { state, setState } = props
    const [history, setHistory] = useState({... blankHistory})
    const [inputValue, setInputValue] = useState('')

    function computeResponse() {
        parser(
            inputValue,
            setInputValue,
            history,
            setHistory,
            state,
            setState
        )
    }

    function onInputChange(e) {
        const newValue = e.target.value
        setInputValue(newValue)
    }

    function keyUpHandler(e) {
        if (e.keyCode === keycodes.enter) {
            computeResponse()
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', keyUpHandler)
        
        return () => {
            window.removeEventListener('keyup', keyUpHandler)
        }
    }, [inputValue])

    return (
        <>
            <div className='consoleBase console'>
                <div className='outputHistory'>
                    {history.consoleHistory.map((h, index) => (<p key={index}>{h.input} -> {h.response}</p>))}
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
                    overflow-y: scroll;
                    height: calc(100% - 35px)
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