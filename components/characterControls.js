import Control from "./control"

export default function CharacterControls(props) {
    const { state, setState, selectedCharacters } = props

    return (
        <>
            <div className='controls'>
                <div className='controlBlock'>
                    <Control label='Kill' icon='/chewed-skull.svg' onClick={() => console.log('Kill button was pressed')} />
                    <Control label='Modify' icon='/potion-ball.svg' onClick={() => console.log('Affect button was pressed')} />
                </div>
                <div className='controlBlock'>
                    <Control label='Heal' icon='/heart-plus.svg' onClick={() => console.log('Heal button was pressed')} />
                    <Control label='Harm' icon='/heart-minus.svg' onClick={() => console.log('Harm button was pressed')} />
                </div>
                <div className='controlBlock'>
                    <Control label='Insert Before' icon='/player-previous.svg' onClick={() => console.log('Insert Before button was pressed')} />
                    <Control label='Insert After' icon='/player-next.svg' onClick={() => console.log('Insert After button was pressed')} />
                </div>
            </div>
            <style jsx>{`
                .controls {
                    width: 100%;
                    text-align: center;
                    margin-top: 30px;
                }
                .controlBlock {
                    width: 100%;
                }
            `}</style>
        </>
    )
}