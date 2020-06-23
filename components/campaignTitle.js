import CampaignSimpleInput from "./campaignSimpleInput";
import css from "styled-jsx/css"

const campaignNameCss = css`
.campaignName {
    position: relative;
    margin: 20px 0 20px 0;
    width: 40%;
    left: 30%;
}
`

export default function CampaignTitle() {
    return (
        <>
            <div className='campaignName'>
                <CampaignSimpleInput path={['name']} placeholder='Campaign Name' />
            </div>
            <style jsx>{campaignNameCss}</style>
        </>
    )
}