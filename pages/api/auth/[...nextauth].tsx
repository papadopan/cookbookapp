import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  },
  callbacks: {
    async jwt(token) {
      console.log('====================================')
      console.log(token)
      console.log('====================================')
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      authorize(credentials) {
        if (credentials.email) return { email: credentials.email }
        return null
      },
    }),
  ],
})
