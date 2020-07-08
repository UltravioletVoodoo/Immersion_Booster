import { useState } from "react"

let modalHandler = undefined

export function renderToModal(component) {
    if (modalHandler) modalHandler(component)
}

export function clearModal() {
    if (modalHandler) modalHandler(undefined)
}


export default function Modal() {
    var [ content, setContent ] = useState(undefined)
    modalHandler = setContent
    
    return (
        <>
            {content && (
                <div className='modalContainer'>
                    <img className='exit' src='/exit-door.svg' onClick={clearModal}></img>
                    <div className='contentContainer'>
                        {content}
                    </div>
                </div>
            )}
            <style jsx>{`
                .modalContainer {
                    position: fixed;
                    left: 20vw;
                    width: 60vw;
                    top: 20vh;
                    height: 60vh;
                    background-color: white;
                    box-shadow: 0 0 20px #000;
                    border-radius: 50px;
                    z-index: 1000;
                }
                .contentContainer {
                    width: calc(100% - 50px);
                    height: calc(100% - 100px);
                    top: 50px;
                    margin: 25px;
                    position: relative;
                }
                .exit {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    top: 0;
                    right: 0;
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}