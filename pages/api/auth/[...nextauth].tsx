import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log('====================================')
        console.log(credentials)
        console.log('====================================')
      },
    }),
  ],
})
