import { useState } from "react"

let soundManager = undefined

export function playSoundEffect(soundFile) {
    if (soundManager) soundManager(soundFile)
}

export default function SoundEffect() {
    const [soundFile, setSoundFile] = useState(undefined)
    soundManager = setSoundFile

    return (
        <>
            {soundFile && (
                <audio src={soundFile} autoPlay></audio>
            )}
        </>
    )
}