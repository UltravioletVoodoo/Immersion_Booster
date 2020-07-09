import TitledBox from "./titledBox";
import { useEffect, useState } from "react";
import CampaignEditor from "./campaignEditor";
import TemplateSelector from "./templateSelector";
import downloadTxt from "../util/downloadTxt";

export default function CampaignTools(props) {
    const { state, setState } = props
    const [campaign, setCampaign] = useState(null)

    function loadCampaign() {
        if (typeof window === 'undefined') return
        setCampaign(JSON.parse(localStorage.getItem('campaign')))
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
            <TitledBox text='Campaign Tools' small={false} leftborder>
                <div className='campaignToolsBase campaignControls'>
                    <CampaignEditor exportCampaign={exportCampaign} />
                </div>
                <div className='campaignToolsBase campaignPreviews'>
                    {campaign ? (
                        <TemplateSelector state={state} setState={setState} encounters={campaign.encounters} />
                    ) : (
                        <p>No campaign present, edit or import one</p>
                    )}
                </div>
            </TitledBox>
            <style jsx>{`
                .campaignToolsBase {
                    position: absolute;
                    top: 0;
                    width: 50%;
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