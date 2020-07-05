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
                    {content}
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
                    border: 10px solid black;
                    border-radius: 50px;
                    z-index: 1000;
                }
            `}</style>
        </>
    )
}