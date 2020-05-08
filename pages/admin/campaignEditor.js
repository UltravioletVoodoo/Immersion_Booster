import Link from "next/link";
import { useState, useEffect } from "react";
import CampaignInputSet from "../../components/campaignInputSet";
import css from "styled-jsx/css"
import CampaignTitle from "../../components/campaignTitle";

const campaignEditorCss = css`
.campaignEditor {
    position: absolute;
    width: 100%;
    left: 0;
}
`

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
        <>
            <div className='campaignEditor'>
                <Link href="/admin">
                    <button>To Admin Dashboard</button>
                </Link>
                {campaign && (
                    <>
                        <CampaignTitle />
                        <CampaignInputSet setName='players' />
                        <CampaignInputSet setName='encounters' />
                    </>
                )}
            </div>
            <style jsx>{campaignEditorCss}</style>
        </>
    )
}