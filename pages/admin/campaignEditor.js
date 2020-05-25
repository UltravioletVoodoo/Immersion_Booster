import Head from 'next/head';
import Base from '../../components/base';
import Link from "next/link";
import { useState, useEffect } from "react";
import CampaignInputSet from "../../components/campaignInputSet";
import css from "styled-jsx/css"
import CampaignTitle from "../../components/campaignTitle";
import { blankCampaign } from '../../util/placeholders';

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
        const dummyCampaign = {... blankCampaign}
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
            <Head>
                <title>Campaign Editor</title>
            </Head>
            <Base />
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