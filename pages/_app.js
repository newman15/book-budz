import { SessionProvider } from "next-auth/react"
import Navbar from "../components/navbar"
// import Navbar from "../components/navBarTwo"
import '../styles/globals.css'

// Trying to get NextAuth.js to work...
export default function MyApp({Component, pageProps }) 
{
    return (
        <SessionProvider session={pageProps.session}>
            <Navbar />
            <Component {...pageProps} />
        </SessionProvider>
    )
}