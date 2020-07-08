import { useState, useEffect } from "react"
import Link from "next/link"
import PreviewSet from "./previewSet"
import downloadTxt from "../util/downloadTxt"
import TitledBox from "./titledBox"


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
            <TitledBox text='Campaign' small={false} leftBorder>
                <div className='templateSelectorBase campaignControls'>
                    <TitledBox text='Campaign Editor'>
                        <Link href='/admin/campaignEditor'>
                            <button>Edit Campaign</button>
                        </Link>
                        <input type='file' onChange={ e => onFileChange(e.target.files[0])}></input>
                        <button onClick={exportCampaign}>Export Campaign</button>
                    </TitledBox>
                </div>
                <div className='templateSelectorBase campaignPreviews'>
                    <TitledBox text='Template Selector' leftBorder>
                        {campaign ? (
                            <PreviewSet set={campaign.encounters} state={state} setState={setState} />
                        ) : (
                            <div>
                                <p>No campaign is present in storage, import one below</p>
                            </div>
                        )}
                    </TitledBox>
                </div>
            </TitledBox>
            <style jsx>{`
                .templateSelectorBase {
                    width: 50%;
                    top: 0;
                    position: absolute;
                    height: 100%;
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