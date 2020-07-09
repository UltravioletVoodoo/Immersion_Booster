export default function MyButton(props) {
    const { onClick, text, color, hoverColor } = props

    return (
        <>  
            <div className='myButton' onClick={onClick}>
                <span className='buttonText'>{text}</span>
            </div>
            <style jsx>{`
                .myButton {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100px;
                    height: 50px;
                    border: 1px solid black;
                    background-color: ${color};
                    cursor: pointer;
                }
                .myButton:hover {
                    background-color: ${hoverColor};
                }
                .buttonText {
                    position: absolute;
                    width: 100%;
                    text-align: center;
                    top: 50%;
                    transform: translateY(-50%);
                }
            `}</style>
        </>
    )
}