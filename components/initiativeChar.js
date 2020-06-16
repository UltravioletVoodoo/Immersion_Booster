import { useRef } from "react"
import shorten from "../util/textShortener"



export default function InitiativeChar(props) {
    const { id, name, playerName, myTurn, isAdmin } = props
    const initiativeCharRef = useRef(null)

    return (
        <>
            <div ref={initiativeCharRef} className='initiativeChar'>
                <div className='order'>
                    <span className='text orderText'>{parseInt(id) + 1}</span>
                </div>
                <div className='name'>
                    <span className='text nameText'>{shorten(name, 20)}</span>
                    {playerName && (
                        <span className='text playerNameText'>{shorten(playerName, 10)}</span>
                    )}
                </div>
            </div>
            <style jsx>{`
                .initiativeChar {
                    width: 100%;
                    height: ${isAdmin ? '20' : '50'}px;
                    margin: ${isAdmin ? '4' : '10'}px 0 ${isAdmin ? '4' : '10'}px 0;
                    background-color: red;
                    position: relative;
                    left: ${myTurn ? '-15%' : '0'};
                    transform: skew(-20deg);
                    transition: 1s;
                }
                .text {
                    font-size: ${isAdmin ? '16' : '30'}px;
                    font-weight: bolder;
                    font-family: fantasy;
                }
                .order {
                    position: absolute;
                    height: 100%;
                    width: ${isAdmin ? '20' : '50'}px;
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
                    width: calc(100% - ${isAdmin ? '40' : '100'}px);
                    left: ${isAdmin ? '40' : '100'}px;
                }
                .nameText {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .playerNameText {
                    position: absolute;
                    right: ${isAdmin ? '25' : '50'}px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: ${isAdmin ? '12' : '20'}px;
                    color: salmon;
                }
            `}</style>
        </>
    )
}