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

export async function findWorkspaceMembers(workspaceId?: string) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(
      `${SERVER_URL}/workspace-member/${workspaceId}/members/all`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
  }
}

export async function removeWorkspaceMember(
  workspaceId?: string,
  memberId?: string
) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.delete(
      `${SERVER_URL}/workspace-member/${workspaceId}/member/${memberId}/delete`,
      {
        headers: { Authorization: `Bearer ${token}` },
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

export async function updateWorkspaceMember(
  workspaceId?: string,
  memberId?: string
) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.put(
      `${SERVER_URL}/workspace-member/${workspaceId}/member/${memberId}/update`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
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

export async function findNyWorkspaceMemberInfo(workspaceId?: string) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(
      `${SERVER_URL}/workspace-member/${workspaceId}/members/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
  }
}
