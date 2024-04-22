import { jwtDecode } from "jwt-decode"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginUser } from '@/data/auth/auth-queries'
import { axiosServerInstance } from "../../../data/common"


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: any, res: any) {
  const providers = [
    CredentialsProvider({
      type: "credentials",
      credentials: {
      },
      async authorize(credentials) {
        try {
          const resp = await loginUser(credentials) as { data: { access_token: string } }
          const decoded = jwtDecode(resp.data.access_token) as { user: string, exp: number }

          const user = { id: "1", email: `${decoded.user}`, accessToken: resp.data.access_token, }
          return user

        } catch (e) {
          console.log(e)
          return null
        }
      },

    }),
  ]


  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: "jwt",
    },
    secret: 'cadadadad',//process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/'
    },
    callbacks: {
      async jwt({ user, token }) {
        //   update token if user is returned
        if (user) {
          token.email = user.email;
          token.accessToken = (user as any).accessToken;

        }
        return token;
      },
      async session({ session, token, }: { session: any; token: any }) {
        session.user.email = token.email
        console.log({ token })
        axiosServerInstance.interceptors.request.use(function (config) {
          config.headers.Authorization = `Bearer ${token.accessToken}`
          return config;
        }, function (error) {
          return Promise.reject(error);
        });
        return session
      },
    },
  })
}