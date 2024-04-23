import { getUser } from "@/lib/db/userCrud";
import { user } from "@prisma/client";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "asma@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await getUser(credentials?.email, credentials?.password);
        if (!user) {
          return null;
        }

        return {
          id: user.user_id + "",
          user_id: user.user_id,
          user_name: user.user_name,
          email: credentials.email,
          name: user.user_name,
          role: user.role,
          phone_number: user.phone_number,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          user_id: token.user_id,
          user_name: token.user_name,
          role: token.role,
          phone_number: token.phone_number,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as user;
        return {
          ...token,
          id: u.user_id,
          user_id: u.user_id,
          user_name: u.user_name,
          role: u.role,
          phone_number: u.phone_number,
        };
      }
      return token;
    },
  },
};
