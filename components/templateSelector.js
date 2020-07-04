import { useState, useEffect } from "react"
import Link from "next/link"
import PreviewSet from "./previewSet"
import downloadTxt from "../util/downloadTxt"


export default function TemplateSelector(props) {
    const { state, setState } = props
    const [campaign, setCampaign] = useState(null)
    let fileReader
    
    
    function loadCampaign() {
        if (typeof window === 'undefined') return null
        setCampaign(JSON.parse(localStorage.getItem('campaign')))
    }

    function handleFileRead() {
        const content = fileReader.result
        console.log(content)
        localStorage.setItem('campaign', content)
    }

    function onFileChange(file) {
        fileReader = new FileReader()
        fileReader.onloadend = handleFileRead
        fileReader.readAsText(file)
    }

    function exportCampaign() {
        const fileName = campaign.name === '' ? 'campaign' : campaign.name 
        downloadTxt(fileName, JSON.stringify(campaign))
    }

    useEffect(() => {
        loadCampaign()
    }, [])

    return (
        <>
            <div className='templateSelectorBase campaignPreviews'>
                {campaign ? (
                    <PreviewSet set={campaign.encounters} state={state} setState={setState} />
                ) : (
                    <div>
                        <p>No campaign is present in storage, import one below</p>
                    </div>
                )}
            </div>
            <div className='templateSelectorBase campaignControls'>
                <Link href='/admin/campaignEditor'>
                    <button>Edit Campaign</button>
                </Link>
                <input type='file' onChange={ e => onFileChange(e.target.files[0])}></input>
                <button onClick={exportCampaign}>Export Campaign</button>
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