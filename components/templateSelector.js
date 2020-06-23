import { useState, useEffect } from "react"
import Link from "next/link"
import PreviewSet from "./previewSet"


export default function TemplateSelector(props) {
    const { state, setState, startCombat } = props
    const [campaign, setCampaign] = useState(null)
    
    
    function loadCampaign() {
        if (typeof window === 'undefined') return null
        setCampaign(JSON.parse(localStorage.getItem('campaign')))
    }

    useEffect(() => {
        loadCampaign()
    }, [])

    return (
        <>
            <div className='templateSelectorBase campaignPreviews'>
                {campaign ? (
                    <PreviewSet set={campaign.encounters} state={state} setState={setState} startCombat={startCombat} />
                ) : (
                    <div>
                        <p>No campaign is present in storage, import one below</p>
                    </div>
                )}
            </div>
            <div className='templateSelectorBase campaignControls'>
                <Link href='/admin/campaignEditor'>
                    <button>Edit/Upload Campaigns</button>
                </Link>
            </div>
            <style jsx>{`
                .templateSelectorBase {
                    width: 50%;
                    top: 0;
                    position: absolute;
                    height: 100%;
                    border: 1px solid black;
                }
                .campaignControls {
                    left: 0;
                }
                .campaignPreviews {
                    left: 50%;
                }
            `}</style>
        </>
    )
}