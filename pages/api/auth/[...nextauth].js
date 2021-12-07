import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: "c2540997b39f8e741c3bda8b793433fb",
  session: {
      strategy: "database",
      maxAge: 1000 * 60 * 60 * 24, // 1 day long = (1000ms/1sec  *  60s/1min  *  60min/1hr  *  24hr/1day)
      updateAge: 24 * 60 * 60, // 24 hours
  }
})