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
                    width: 100px;
                    height: 50px;
                    background-color: cyan;
                    text-align: center;
                    border-radius: 30px;
                    border: 2px solid brown;
                    opacity: 0.1;
                    transition: 0.5s;
                }
                .ChooseSiteBtn:hover {
                    opacity: 1;
                }
                .ChooseSiteBtn_Text {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 100%;
                }
            `}</style>
        </>
    )
}