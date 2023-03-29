import type {NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import { IComic } from 'types/IComic.type';
import GridLayout from 'dh-marvel/components/Grid/Grid';

interface HomeProps{
    comics: IComic[],
    count: number,
    total:number,
}

const QTY_OF_COMICS = 12;

const Index: NextPage<HomeProps> = ({ comics, count, total }) => {
    
    return (
        <>
            <Head>
                <title>Marvel Store</title>
                <meta name="description" content="Marvel comic store"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <BodySingle title={"Marvel Cómics"}>
                <GridLayout comics={ comics }></GridLayout>
            </BodySingle>
        </>
    )
}

export const getServerSideProps = async() =>{
    const comics = await getComics(0,QTY_OF_COMICS)

    return{
        props:{
            comics: comics.data.results,
            count: comics.data.count,
            total: comics.data.total
        }
    }
}

export default Index
