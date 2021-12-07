import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'

// Trying to get NextAuth.js to work...
export default function MyApp({Component, pageProps: { session, ...pageProps },}) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

// function MyApp({ Component, pageProps }) {
//     return <Component {...pageProps} />
//   }
  
//   export default MyApp