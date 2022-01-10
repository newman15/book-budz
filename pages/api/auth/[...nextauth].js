import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    }),

    // EmailProvider({
    //     server: process.env.EMAIL_SERVER,
    //     from: process.env.EMAIL_FROM,
    // }),
],

// MongoDB Adapter
adapter: MongoDBAdapter(clientPromise),
session: {
    strategy: "database",
    maxAge: 1000 * 60 * 60 * 24, // 1 day long = (1000ms/1sec  *  60s/1min  *  60min/1hr  *  24hr/1day)
    updateAge: 24 * 60 * 60, // 24 hours
},

// The secret should be set to a reasonably long random string.
// It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
// a separate secret is defined explicitly for encrypting the JWT.
secret: process.env.SECRET,

// You can define custom pages to override the built-in ones. These will be regular Next.js pages
// so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
// The routes shown here are the default URLs that will be used when a custom
// pages is not specified for that route.
// https://next-auth.js.org/configuration/pages
pages: {
// signIn: '/auth/signin',  // Displays signin buttons
// signOut: '/auth/signout', // Displays form with sign out button
// error: '/auth/error', // Error code passed in query string as ?error=
// verifyRequest: '/auth/verify-request', // Used for check email page
// newUser: null // If set, new users will be directed here on first sign in
},

// Callbacks are asynchronous functions you can use to control what happens
// when an action is performed.
// https://next-auth.js.org/configuration/callbacks
callbacks: {
    // Add the userId to the session object
    async session({ session, user }) { 
        session.userId = user.id;
        return Promise.resolve(session); 
    }

    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async jwt({ token, user, account, profile, isNewUser }) { return token },
},

// Events are useful for logging
// https://next-auth.js.org/configuration/events
events: {},

// You can set the theme to 'light', 'dark' or use 'auto' to default to the
// whatever prefers-color-scheme is set to in the browser. Default is 'auto'
theme: {
    colorScheme: "light",
},

// Enable debug messages in the console if you are having problems
debug: false,
})