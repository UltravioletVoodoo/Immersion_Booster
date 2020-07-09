export default function FileUploadBtn(props) {
    const { uploadHandler, text } = props

    return (
        <>
            <label className='uploadBtn'>
                <span className='buttonText'>{text}</span>
                <input type='file' onChange={ e => uploadHandler(e.target.files[0])}></input>
            </label>
            <style jsx>{`
                .buttonText {
                    text-align: center;
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
                input[type='file'] {
                    display: none;
                }
                .uploadBtn {
                    width: 100px;
                    height: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    border: 1px solid black;
                    background-color: cyan;
                    display: block;
                    position: relative;
                    cursor: pointer;
                }
                .uploadBtn:hover {
                    background-color: pink;
                }
            `}</style>
        </>
    )
}