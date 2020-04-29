import Head from 'next/head'
import Base from '../components/base'
import css from "styled-jsx/css"
import FieldEditor from '../components/fieldEditor'

export default function Admin() {
    return (
        <div>
            <Head>
                <title>Immersion Admin</title>
            </Head>
            <Base />
            <h1>Admin Page</h1>
            <FieldEditor fieldName="CenterImage" placeHolder='Image URL' />
            <FieldEditor fieldName="CenterImageLabel" placeHolder='Label Text' />
        </div>
    )
}