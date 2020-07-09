import TitledBox from "./titledBox";
import Link from "next/link";

export default function CampaignEditor(props) {
    const { exportCampaign } = props
    let fileReader

    function handleFileRead() {
        const content = fileReader.result
        localStorage.setItem('campaign', content)
    }

    function onFileChange(file) {
        fileReader = new FileReader()
        fileReader.onloadend = handleFileRead
        fileReader.readAsText(file)
    }

    return (
        <>
            <TitledBox text='Campaign Editor' small>
                <Link href='/admin/campaignEditor'>
                    <button>Edit Campaign</button>
                </Link>
                <input type='file' onChange={ e => onFileChange(e.target.files[0])}></input>
                <button onClick={exportCampaign}>Export Campaign</button>
            </TitledBox>
            <style jsx>{`
                
            `}</style>
        </>
    )
}