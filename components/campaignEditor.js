import TitledBox from "./titledBox";
import Link from "next/link";
import FileUploadBtn from "./fileUploadBtn";
import MyButton from "./myButton";

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
                <div className='editContainer'>
                    <div className='editBtn'>
                        <Link href='/admin/campaignEditor'>
                            <MyButton text='Edit Campaign' color='cyan' hoverColor='pink' />
                        </Link>
                    </div>
                </div>
                <div className='importExportContainer'>
                    <div className='importExportBtns importBtn'>
                        <FileUploadBtn uploadHandler={onFileChange} text='Upload Campaign' />
                    </div>
                    <div className='importExportBtns exportBtn'>
                        <MyButton onClick={exportCampaign} text='Export Campaign' color='cyan' hoverColor='pink' />
                    </div>
                </div>
            </TitledBox>
            <style jsx>{`
                .editContainer {
                    position: absolute;
                    width: 100%;
                    height: 50%;
                    top: 0;
                }
                .editBtn {
                    position: absolute;
                    top: 50%;
                    height: 50%;
                    width: 100%;
                    transform: translateY(-50%);
                }
                .importExportContainer {
                    position: absolute;
                    top: 50%;
                    width: 100%;
                    height: 50%;
                }
                .importExportBtns {
                    position: absolute;
                    width: 50%;
                }
                .importBtn {
                    left: 0;
                }
                .exportBtn {
                    left: 50%;
                }
            `}</style>
        </>
    )
}