import css from "styled-jsx/css"
import { useEffect } from "react"

const previewCss = css`
.preview {
    position: relative;
    height: 100%;
    width: 100%;
    text-align: center;
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.5s;
}
.preview:hover {
    box-shadow: 0 0 10px black;
}
.previewLabel {
    font-size: 20px;
    position: absolute;
    top: 0;
    width: 100px;
    left: calc(50% - 50px);
}
.previewImage {
    height: 100%;
    width: auto;
}
.actionButton {
    width: 25%;
    height: 25%;
    top: 50%;
    z-index: 2;
    position: absolute;
    transform: translate(-50%, -50%);
    transition: 0.5s;
    opacity: 0.4;
}
.actionButton:hover {
    opacity: 1;
}
.leftBtn {
    left: 25%;
}
.rightBtn {
    left: 75%;
}
.centerBtn {
    left: 50%;
}
`

function checkEnemiesPresent(enemies) {
    try {
        if (enemies.length > 0) return true
        return false
    } catch(e) {
        return false
    }
}

export default function Preview(props) {
    const { label, image, enemies } = props
    let labelChannel, imageChannel, setCombatChannel
    const enemiesPresent = checkEnemiesPresent(enemies)
    const encounterBtnClasses = `actionButton ${enemiesPresent ? 'leftBtn' : 'centerBtn' }`

    function broadCast(isCombat) {
        labelChannel.postMessage(label)
        imageChannel.postMessage(image)
        setCombatChannel.postMessage(isCombat ? enemies : null)
    }

    function broadcastEncounter() {
        broadCast(false)
    }

    function broadcastCombat() {
        broadCast(true)
    }

    useEffect(() => {
        labelChannel = new BroadcastChannel('addCenterImageLabel')
        imageChannel = new BroadcastChannel('addCenterImage')
        setCombatChannel = new BroadcastChannel('setCombat')

        return () => {
            labelChannel.close()
            imageChannel.close()
            setCombatChannel.close()
        }
    }, [])

    return (
        <>
            <div className='preview'>
                <label className='previewLabel'>{label}</label>
                <img className='previewImage' src={image}></img>
                <img className={encounterBtnClasses} src='/scroll-quill.svg' onClick={broadcastEncounter}></img>
                {enemiesPresent && (
                    <img className='actionButton rightBtn' src='/swords-emblem.svg' onClick={broadcastCombat}></img>
                )}
            </div>
            <style jsx>{previewCss}</style>
        </>
    )
}