import Link from 'next/link'

export default function ChooseSiteBtn(props) {
    const { text, href } = props

    return (
        <>
            <Link href={href}>
                <span className='ChooseSiteBtn'>
                    <div className='ChooseSiteBtn_Text'>
                        {text}
                    </div>
                </span>
            </Link>
            <style jsx>{`
                .ChooseSiteBtn {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: cyan;
                    text-align: center;
                    border-radius: 30px;
                    border: 2px solid brown;
                    opacity: 0.1;
                    transition: 0.5s;
                    cursor: pointer;
                }
                .ChooseSiteBtn:hover {
                    opacity: 1;
                }
                .ChooseSiteBtn_Text {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 100%;
                    font-size: 16px;
                }
                @media screen and (max-width: 565px) {
                    .ChooseSiteBtn_Text {
                        font-size: 12px;
                    }
                }
                @media screen and (max-width: 400px) {
                    .ChooseSiteBtn_Text {
                        font-size: 10px;
                    }
                }
            `}</style>
        </>
    )
}