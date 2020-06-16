export default function Control(props) {
    const { label, icon, onClick } = props

    return (
        <>
            <div className='control' onClick={onClick}>
                <img className='button' src={icon}></img>
                <label className='label'>{label}</label>
            </div>
            <style jsx>{`
                .control {
                    width: 50px;
                    height: 50px;
                    position: relative;
                    cursor: pointer;
                    display: inline-block;
                }
                .button {
                    position: absolute;
                    width: 50%;
                    left: 25%;
                    top: 5px;
                    cursor: pointer;
                }
                .label {
                    position: relative;
                    top: 30px;
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}