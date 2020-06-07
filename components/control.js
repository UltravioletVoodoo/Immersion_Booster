export default function Control(props) {
    const { label, icon, onClick } = props

    return (
        <>
            <div className='control'>
                <img className='button' src={icon} onClick={onClick}></img>
                <label className='label'>{label}</label>
            </div>
            <style jsx>{`
                .control {
                    width: 50px;
                    height: 50px;
                    border: 1px solid black;
                    position: absolute;
                }
                .button {
                    position: absolute;
                    width: 50%;
                    left: 25%;
                    top: 5px;
                    cursor: pointer;
                }
                .label {
                    position: absolute;
                    top: 30px;
                    text-align:center;
                    width: 100%;
                }
            `}</style>
        </>
    )
}