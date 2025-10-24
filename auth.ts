import axios from "axios";
import NextAuth, { NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import { SERVER_URL } from "./lib/constants";

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const response = await axios.post(
      `${SERVER_URL}/auth/refresh`,
      {
        oldRefreshToken: token.serverTokens.refreshToken,
      },
      {
        headers: {
          authorization: `Refresh ${token.serverTokens.refreshToken}`,
        },
      }
    );

    const newRefreshToken = await response.data.body;

    return {
      ...token,
      serverTokens: newRefreshToken,
    };
  } catch (error) {
    await signOut();
    return { ...token, error: "RefreshToken Error", user: token.user || null };
  }
}

export const config = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  cookies: {
    sessionToken: {
      name: process.env.NEXTAUTH_SESSION_TOKEN_NAME,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;

        const response = await axios.post(`${SERVER_URL}/auth/login`, {
          email,
          password,
        });
        const user = await response.data.body;
        return user;
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
      async profile(profile) {
        const user = {
          id: String(profile.id),
          name: profile.properties.nickname,
          email: profile.kakao_account.email,
          password: "",
          image: profile.properties.profile_image,
          provider: "카카오",
        };

        const response = await axios.post(
          `${SERVER_URL}/auth/social-login`,
          user
        );
        const result = await response.data.body;
        return result;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      async profile(profile) {
        const user = {
          id: profile.sub,
          name: profile.name,
          password: "",
          email: profile.email,
          image: profile.picture,
          provider: "구글",
        };

        const response = await axios.post(
          `${SERVER_URL}/auth/social-login`,
          user
        );
        const result = await response.data.body;
        result.id = user.id;
        return result;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (user) return { ...token, ...user };
      if (
        token.serverTokens &&
        new Date().getTime() > token.serverTokens.expiresIn - 1000
      ) {
        token = await refreshToken(token);
      }
      if (trigger === "update" && session) {
        token.user.name = session.user.name;
        token.user.image = session.user.image;
      }
      {
        /* 업데이트 */
      }
      // const updatedData = {
      //   user: {
      //     name: "Updated Name",
      //     image: "https://example.com/updated-image.jpg",
      //   }
      // }
      // void update(updatedData);
      return token;
    },
    async session({ session, token }: any) {
      session.user = {
        id: token.user.id,
        email: token.user.email,
        name: token.user.name,
        image: token.user.image,
        provider: token.user.provider,
      };

      session.serverTokens = token.serverTokens;

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
