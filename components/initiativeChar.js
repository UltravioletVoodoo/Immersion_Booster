import { useRef } from "react"



export default function InitiativeChar(props) {
    const { id, name, playerName, myTurn, killer, deleter, isSmall, isAlive } = props
    const initiativeCharRef = useRef(null)

    function deleteMe() {
        function handleDeletion() {
            initiativeCharRef.current.removeEventListener('animationend', handleDeletion)
            deleter(id)
        }
        initiativeCharRef.current.addEventListener('animationend', handleDeletion)
        killer(id)
    }

    return (
        <>
            <div ref={initiativeCharRef} className={`initiativeChar${isAlive ? '' : ' animate'}`}>
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
                <div className={`slasher${isAlive ? '' : ' animate'}`} />
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
                }
                .initiativeChar.animate {
                    animation-name: deathAnimation;
                    animation-duration: 1s;
                    animation-fill-mode: forwards;
                }
                @keyframes deathAnimation {
                    0% {
                        opacity: 1;
                    }
                    40% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
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
                .slasher {
                    height: 15px;
                    background-color: white;
                    position: absolute;
                    top: 50%;
                    left: -15px;
                    transform: translateY(-50%);
                    border-radius: 50%;
                }
                .slasher.animate {
                    animation-name: slashAnimation;
                    animation-duration: 1s;
                    animation-fill-mode: forwards;
                }
                @keyframes slashAnimation {
                    0% {
                        width: 0; 
                    }
                    20% {
                        width: calc(100% + 30px)
                    }
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