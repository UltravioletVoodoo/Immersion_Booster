import { useState, useEffect } from "react"

export default function CampaignNotes() {
    const [notes, setNotes] = useState('')
    
    function loadNotes() {
        if (typeof window === 'undefined') return
        setNotes(JSON.parse(localStorage.getItem('campaign')).notes)
    }

    useEffect(() => {
        loadNotes()
    }, [])

    return (
        <>
            <div className='campaignNotes'>
                <textarea value={notes} disabled />
            </div>
            <style jsx>{`
                .campaignNotes {
                    width: 100%;
                    height: 100%;
                }
                .campaignNotes > textarea {
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </>
    )
}