import Link from "next/link";
import { useState, useEffect } from "react";
import CampaignSimpleInput from "../../components/campaignSimpleInput";
import CampaignPlayersInput from "../../components/campaignPlayersInput";

export default function CampaignEditor() {
    const [campaign, setCampaign] = useState(undefined)
    
    function saveDummyCampaign() {
        if (typeof window === 'undefined') return
        const dummyCampaign = {
            name: '',
            players: [],
            encounters: [],
            combats: []
        }
        localStorage.setItem('campaign', JSON.stringify(dummyCampaign))
        return dummyCampaign
    }

    function loadCampaign() {
        if (typeof window === 'undefined') return
        let campaign = localStorage.getItem('campaign')
        if (!campaign) {
            campaign = saveDummyCampaign()
        }
        setCampaign(campaign)
    }

    useEffect(() => {
        loadCampaign()
    }, [])
    
    return (
        <div>
            <Link href="/admin">
                <button>To Admin Dashboard</button>
            </Link>
            {campaign && (
                <>
                    <CampaignSimpleInput path={['name']} placeholder='Campaign Name' />
                    <CampaignPlayersInput />
                </>
            )}
        </div>
    )
}