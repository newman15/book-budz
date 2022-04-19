import Head from 'next/head'
import Image from 'next/image'
import NewReleases from '../components/newReleases'
import NewReleasesV2 from '../components/newReleases/newReleasesV2'
import styles from '../styles/Home.module.css'

export default function Home() {
    
    return (
        <div className="container">
            <Head>
                <title>Book Budz</title>
                <meta name="description" content="Book Budz, Book Club" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Book Budz</h1>

                {/* <NewReleasesV2 /> */}

            </main>

            <footer>

                <div className="container text-center">
                    <hr />
                    <div className="m-6">
                        <a className='p-6'
                            href="https://www.linkedin.com/in/aaron-newman-897141133/" target="_blank" rel='noopener noreferrer'>
                            <Image src="/icons/LinkedIn.svg" alt="Github Logo" width={50} height={50} />
                        </a>
                        <a  className='p-6'
                            href="https://github.com/newman15?tab=repositories" target="_blank" rel='noopener noreferrer'>
                            <Image src="/icons/github.svg" alt="Github Logo" width={50} height={50} />
                        </a>
                    </div>
                </div>
            
            </footer>
        </div>
    )
}
