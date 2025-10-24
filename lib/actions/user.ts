"use server";

import { auth } from "@/auth";
import axios from "axios";
import { SERVER_URL } from "../constants";

export async function findUserById(id?: string) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
  }
}
