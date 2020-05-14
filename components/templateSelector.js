import { useState, useEffect } from "react"
import Link from "next/link"
import css from "styled-jsx/css"
import PreviewSet from "./previewSet"


const TemplateSelectorCss = css`
.templateSelectorContainer {
    width: 100%;
    height: 100%;
}
.campaignEditBtn {
    position: absolute;
    bottom: 0;
}
`


export default function TemplateSelector(props) {
    const { state, setState } = props
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
            <div className='templateSelectorContainer'>
                {campaign ? (
                    <PreviewSet set={campaign.encounters} state={state} setState={setState} />
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
            </div>
            <style jsx>{TemplateSelectorCss}</style>
        </>
    )
}