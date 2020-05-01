import Link from "next/link";
import { useState, useEffect } from "react";

export default function CampaignEditor() {
    const [campaign, setCampaign] = useState(null)
    
    function loadCampaign() {
        if (typeof window === 'undefined') return
        setCampaign(JSON.parse(localStorage.getItem('campaign')))
    }

    function setDummyData() {
        if (typeof window === 'undefined') return
        localStorage.setItem('campaign', JSON.stringify({name: 'test campaign', encounters: ['1','2']}))
    }

    useEffect(() => {
        loadCampaign()
    }, [])
    
    return (
        <div>
            <Link href="/admin">
                <button>To Admin Dashboard</button>
            </Link>
            <textarea value={JSON.stringify(campaign, undefined, 4)}></textarea>
            <button onClick={setDummyData}>Set Dummy Data</button>
        </div>
    )
}