import { useState, useEffect } from "react"
import Link from "next/link"
import css from "styled-jsx/css"


const TemplateSelectorCss = css`
.campaignEditBtn {
    position: absolute;
    bottom: 0;
}
`


export default function TemplateSelector() {
    const [campaign, setCampaign] = useState(null)
    
    
    function loadCampaign() {
        if (typeof window === 'undefined') return null
        setCampaign(JSON.parse(localStorage.getItem('campaign')))
    }

    useEffect(() => {
        loadCampaign()
    }, [])

    return (
        <div>
            {campaign ? (
                <p>{JSON.stringify(campaign)}</p>
            ) : (
                <div>
                    <p>No campaign is present in storage, import one below</p>
                </div>
            )}
            <div className='campaignEditBtn'>
                <Link href='/admin/campaignEditor'>
                    <button>Edit/Upload Campaigns</button>
                </Link>
            </div>
            <style jsx>{TemplateSelectorCss}</style>
        </div>
    )
}