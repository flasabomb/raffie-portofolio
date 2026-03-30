import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authConfig: NextAuthConfig = {
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24
  },
  pages: {
    signIn: "/secret-admin"
  },
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const password = String(credentials?.password || "");

        if (password && password === process.env.ADMIN_PASSWORD) {
          return { id: "1", name: "Raffie Admin" };
        }

        return null;
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
export { authConfig };
