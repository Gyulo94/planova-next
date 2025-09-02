import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      provider: string;
    };

    serverTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      provider: string;
    };

    serverTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
