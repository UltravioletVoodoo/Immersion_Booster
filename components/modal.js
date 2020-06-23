export default function Modal(props) {
    const { children } = props
    
    return (
        <>
            <div className='modalContainer'>
                {children}
            </div>
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