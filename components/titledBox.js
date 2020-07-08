export default function TitledBox(props) {
    const { text, small=true, children, leftBorder=false } = props

    return (
        <>
            <div className='titledBox'>
                <div className='titledBoxTitleContainer'>
                    <span className='titledBoxTitle'>{text}</span>
                </div>
                <div className='titledBoxContent'>
                    {children}
                </div>
            </div>
            <style jsx>{`
                .titledBox {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    ${leftBorder ? 'border-left: 1px solid black;' : ''}
                }
                .titledBoxTitleContainer {
                    position: absolute;
                    width: 100%;
                    height: ${small ? '25' : '50'}px;
                    border-bottom: 1px solid black;
                }
                .titledBoxTitle {
                    font-size: ${small ? '16' : '25'}px;
                    position: absolute;
                    top: 50%;
                    text-align: center;
                    width: 100%;
                    transform: translateY(-50%);
                }
                .titledBoxContent {
                    position: absolute;
                    top: ${small ? '25' : '50'}px;
                    height: calc(100% - ${small ? '25' : '50'}px);
                    width: 100%;
                }
            `}</style>
        </>
    )
}