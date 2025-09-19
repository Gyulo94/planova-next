"use server";

import { auth, signIn } from "@/auth";
import axios from "axios";
import { cookies } from "next/headers";
import z from "zod/v3";
import { SERVER_URL } from "../constants";
import {
  LoginFormSchema,
  ResetPasswordFormSchema,
  SignupFormSchema,
} from "../validations";

export async function login(values: z.infer<typeof LoginFormSchema>) {
  const { email, password } = values;
  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
}

export async function signup(values: z.infer<typeof SignupFormSchema>) {
  const { name, email, token, password } = values;
  await axios.post(`${SERVER_URL}/auth/signup`, {
    name,
    email,
    token,
    password,
  });

  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
}

export async function logout() {
  const session = await auth();
  if (!session) return;
  await (await cookies()).delete(process.env.NEXTAUTH_SESSION_TOKEN_NAME!);
}

export async function sendEmail(email: string, type: "signup" | "reset") {
  const url =
    type === "signup"
      ? `${SERVER_URL}/auth/send-signup-email`
      : `${SERVER_URL}/auth/send-reset-password-email`;

  try {
    const response = await axios.post(url, {
      email,
      type,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function verifyToken(token: string) {
  try {
    const response = await axios.get(`${SERVER_URL}/auth/verify-token`, {
      params: { token },
    });
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordFormSchema>
) => {
  const { email, token, password } = values;
  try {
    const response = await axios.post(`${SERVER_URL}/auth/reset-password`, {
      email,
      token,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
};
