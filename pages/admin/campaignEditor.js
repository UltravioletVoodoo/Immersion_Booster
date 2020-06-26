import Head from 'next/head';
import Base from '../../components/base';
import Link from "next/link";
import { useState, useEffect } from "react";
import CampaignInputSet from "../../components/campaignInputSet";
import css from "styled-jsx/css"
import CampaignTitle from "../../components/campaignTitle";
import { blankCampaign } from '../../util/placeholders';
import CampaignNotesEditor from '../../components/campaignNotesEditor';
import deepCopy from '../../util/deepcopy';

const campaignEditorCss = css`
.campaignEditor {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}
.templates {
    position: absolute;
    left: 0;
    right: 50%;
    top: 0;
    height: 100%;
    overflow-y: scroll;
}
.notes {
    position: absolute;
    left: 50%;
    right: 0;
    top: 0;
    height: 100%;
    overflow-y: scroll;
}
`

export default function CampaignEditor() {
    const [campaign, setCampaign] = useState(undefined)
    
    function saveDummyCampaign() {
        if (typeof window === 'undefined') return
        const dummyCampaign = deepCopy(blankCampaign)
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
                {campaign && (
                    <>
                        <div className='templates'>
                            <Link href="/admin">
                                <button>To Admin Dashboard</button>
                            </Link>
                            <CampaignTitle />
                            <CampaignInputSet setName='players' />
                            <CampaignInputSet setName='encounters' />
                        </div>
                        <div className='notes'>
                            <CampaignNotesEditor />
                        </div>
                    </>
                )}
            </div>
            <style jsx>{campaignEditorCss}</style>
        </>
    )
}