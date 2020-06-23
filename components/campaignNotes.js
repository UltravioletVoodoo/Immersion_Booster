import { useState, useEffect } from "react";
import * as showdown from 'showdown';
import { showdownOptions } from "../util/placeholders";

export default function CampaignNotes() {
    const [notes, setNotes] = useState(undefined)
    
    function loadNotes() {
        if (typeof window === 'undefined') return
        const converter = new showdown.Converter(showdownOptions)
        const campaign = JSON.parse(localStorage.getItem('campaign'))
        if (!campaign) return
        setNotes(converter.makeHtml(campaign.notes))
    }

    useEffect(() => {
        loadNotes()
    }, [])

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: notes}} className='campaignNotes' />
            <style jsx>{`
                .campaignNotes {
                    width: 100%;
                    height: 100%;
                    overflow-y: scroll;
                }
            `}</style>
        </>
    )
}