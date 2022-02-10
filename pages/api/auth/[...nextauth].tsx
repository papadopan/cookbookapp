import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import jwt from 'jsonwebtoken'

export default NextAuth({
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 356, // one year
    encode: async ({ secret, token }) => {
      return jwt.sign({ ...token }, secret, {
        algorithm: 'HS256',
      })
    },
    decode: async ({ secret, token }) => {
      return jwt.verify(token, secret, { algorithms: ['HS256'] })
    },
  },
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      authorize: ({ email, name }) => {
        if (email && name) return { email, name }
        return null
      },
    }),
  ],
})
