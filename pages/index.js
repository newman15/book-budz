import Head from 'next/head'
import Image from 'next/image'
import NewReleases from '../components/newReleases'
import NewReleasesV2 from '../components/newReleases/newReleasesV2'
import styles from '../styles/Home.module.css'

export default function Home() {
    
    return (
        <div className={styles.container}>
            <Head>
                <title>Book Budz</title>
                <meta name="description" content="Book Budz, Book Club" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className={styles.title}>
                    Book Budz
                </h1>

                <p className={styles.description}>
                    Newest Book Releases
                </p>

                <NewReleasesV2 />

            </main>

            <footer className={styles.footer}>

                <div className={styles.logo}>
                    <p>Developed By Aaron Newman</p>
                    <span>
                        <a href="https://github.com/newman15?tab=repositories" target="_blank" rel='noopener noreferrer'>
                            <Image src="/icons/github.svg" alt="Github Logo" width={50} height={50} />
                        </a>
                    </span>
                </div>
            
            </footer>
        </div>
    )
}
