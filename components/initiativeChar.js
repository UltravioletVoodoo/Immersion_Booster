


export default function InitiativeChar(props) {
    const { id, name, playerName, myTurn, deleter, isSmall } = props

    function deleteMe() {
        deleter(id)
    }

    return (
        <>
            <div className='initiativeChar'>
                <div className='order'>
                    <span className='text orderText'>{parseInt(id) + 1}</span>
                </div>
                <div className='name'>
                    <span className='text nameText'>{name}</span>
                    {playerName && (
                        <span className='text playerNameText'>{playerName}</span>
                    )}
                </div>
                <img onClick={deleteMe} className='deleteBtn' src='/trash-can.svg'></img>
            </div>
            <style jsx>{`
                .initiativeChar {
                    width: 100%;
                    height: ${isSmall ? '20' : '50'}px;
                    margin: ${isSmall ? '4' : '10'}px 0 ${isSmall ? '4' : '10'}px 0;
                    background-color: red;
                    position: relative;
                    left: ${myTurn ? '-15%' : '0'};
                    transform: skew(-20deg);
                    transition: 1s;
                }
                .initiativeChar:hover .deleteBtn {
                    opacity: 1;
                }
                .deleteBtn {
                    height: 80%;
                    top: 10%;
                    position: absolute;
                    right: 5px;
                    opacity: 0;
                    cursor: pointer;
                    transition: 1s;
                }
                .text {
                    font-size: ${isSmall ? '16' : '30'}px;
                    font-weight: bolder;
                    font-family: fantasy;
                }
                .order {
                    position: absolute;
                    height: 100%;
                    width: ${isSmall ? '20' : '50'}px;
                    background-color: yellow;
                }
                .orderText {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    color: red;
                }
                .name {
                    position: absolute;
                    height: 100%;
                    width: calc(100% - ${isSmall ? '40' : '100'}px);
                    left: ${isSmall ? '40' : '100'}px;
                }
                .nameText {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .playerNameText {
                    position: absolute;
                    right: ${isSmall ? '25' : '50'}px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: ${isSmall ? '12' : '20'}px;
                    color: salmon;
                }
            `}</style>
        </>
    )
}