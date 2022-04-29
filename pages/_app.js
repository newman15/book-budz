import { SessionProvider } from "next-auth/react"
// import Navbar from "../components/navbar"
import Navbar from "../components/navBarTwo"
import '../styles/globals.css'

// Trying to get NextAuth.js to work...
export default function MyApp({Component, pageProps:{session, ...pageProps} }) 
{
    return (
        <SessionProvider session={session}>
            <Navbar />
            <Component {...pageProps} />
        </SessionProvider>
    )
}