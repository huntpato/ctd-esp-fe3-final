import type {NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>Marvel Store</title>
                <meta name="description" content="Marvel comic store"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <BodySingle title={"Sample"}>
            </BodySingle>
        </>
    )
}

export default Index
