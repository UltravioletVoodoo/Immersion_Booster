import css from "styled-jsx/css"


function getStyles(isSmall) {
    return css`
        .initiativeChar {
            width: 100%;
            height: ${isSmall ? '20' : '50'}px;
            margin: ${isSmall ? '4' : '10'}px 0 ${isSmall ? '4' : '10'}px 0;
            background-color: red;
            position: relative;
            transform: skew(-20deg);
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
        .activeTurn {
            animation-name: activeTurnAnimation;
            animation-duration: 1s;
            animation-fill-mode: forwards;
        }
        .inactiveTurn {
            animation-name: inactiveTurnAnimation;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
        }
        @keyframes activeTurnAnimation {
            from {
                left: 0px;
            }
            to {
                left: -15%;
            }
        }
        @keyframes inactiveTurnAnimation {
            from {
                left: -15%;
            }
            to {
                left: 0px;
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
    `
}

export default function InitiativeChar(props) {
    const { id, name, playerName, myTurn, deleter, isSmall } = props

    function deleteMe() {
        deleter(id)
    }

    const initiativeCharClassNames = `initiativeChar ${myTurn ? 'activeTurn' : 'inactiveTurn'}`

    const styles = getStyles(isSmall)

    return (
        <>
            <div className={initiativeCharClassNames}>
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
            <style jsx>{styles}</style>
        </>
    )
}