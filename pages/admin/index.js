import Head from 'next/head'
import Base from '../../components/base'
import css from "styled-jsx/css"
import FieldEditor from '../../components/fieldEditor'
import TemplateSelector from '../../components/templateSelector'


const AdminCss = css`
.manualEditors {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 50vw;
    background-color: grey;
}
.templateSelector {
    position: fixed;
    top: 0;
    left: 50vw;
    right: 0;
    bottom: 0;
    background-color: white;
}
`


export default function Admin() {
    return (
        <div>
            <Head>
                <title>Immersion Admin</title>
            </Head>
            <Base />
            <h1>Admin Page</h1>
            <div className='manualEditors'>
                <FieldEditor fieldName="CenterImage" placeHolder='Image URL' />
                <FieldEditor fieldName="CenterImageLabel" placeHolder='Label Text' />
            </div>
            <div className='templateSelector'>
                <TemplateSelector />
            </div>
            <style jsx>{AdminCss}</style>
        </div>
    )
}