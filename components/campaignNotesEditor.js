import { useState, useEffect } from "react"




function loadData() {
    if (typeof window === 'undefined') return
    return JSON.parse(localStorage.getItem('campaign')).notes
}

function saveData(newValue) {
    if (typeof window === 'undefined') return
    const campaign = JSON.parse(localStorage.getItem('campaign'))
    campaign.notes = newValue
    localStorage.setItem('campaign', JSON.stringify(campaign))
}

export default function CampaignNotesEditor() {
    const [notes, setNotes] = useState('')
    
    function notesOnChange(e) {
        const newValue = e.target.value ? e.target.value : ''
        saveData(newValue)
        setNotes(newValue)
    }

    useEffect(() => {
        setNotes(loadData())
    }, [])
    
    return (
        <>
            <div className='campaignNotesEditor'>
                <textarea className='campaignNotesEditorTextArea' placeholder='Campaign notes go here...' value={notes} onChange={notesOnChange} />
            </div>
            <style jsx>{`
                .campaignNotesEditor {
                    height: 100%;
                    width: 100%;
                }
                .campaignNotesEditor > textarea {
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </>
    )
}