import css from "styled-jsx/css"

const initiativeCharCss = css`
.initiativeChar {
    width: 100%;
    height: 50px;
    margin: 10px 0 10px 0;
    background-color: red;
    position: relative;
    transform: skew(-20deg);
}
.initiativeChar:hover .deleteBtn {
    opacity: 1;
}
.deleteBtn {
    width: 40px;
    top: 10%;
    position: absolute;
    right: 5%;
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
        left: -50px;
    }
}
@keyframes inactiveTurnAnimation {
    from {
        left: -50px;
    }
    to {
        left: 0px;
    }
}
.text {
    font-size: 30px;
    font-weight: bolder;
    font-family: fantasy;
}
.order {
    position: absolute;
    height: 100%;
    width: 50px;
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
    width: calc(100% - 100px);
    left: 100px;
}
.nameText {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
.playerNameText {
    position: absolute;
    right: calc(10% + 40px);
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: salmon;
}
`

export default function InitiativeChar(props) {
    const { id, name, playerName, myTurn, deleter } = props

    function deleteMe() {
        deleter(id)
    }

    const initiativeCharClassNames = `initiativeChar ${myTurn ? 'activeTurn' : 'inactiveTurn'}`

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
            <style jsx>{initiativeCharCss}</style>
        </>
    )
}