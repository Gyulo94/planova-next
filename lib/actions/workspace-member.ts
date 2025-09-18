"use server";

import { auth } from "@/auth";
import axios from "axios";
import { SERVER_URL } from "../constants";

export async function joinWorkspace(workspaceId?: string, inviteCode?: string) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.post(
      `${SERVER_URL}/workspace-member/${workspaceId}/join`,
      { inviteCode },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
  }
}
