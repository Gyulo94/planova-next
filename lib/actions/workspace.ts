"use server";

import { auth } from "@/auth";
import axios from "axios";
import z from "zod/v3";
import { SERVER_URL } from "../constants";
import { WorkspaceFormSchema } from "../validations";

export async function createWorkspace(
  values: z.infer<typeof WorkspaceFormSchema>
) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.post(
      `${SERVER_URL}/workspace/create`,
      values,
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

export async function updateWorkspace(
  values: z.infer<typeof WorkspaceFormSchema>,
  id?: string
) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.put(
      `${SERVER_URL}/workspace/${id}/update`,
      values,
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

export async function findWorkspaces() {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/workspace/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
  }
}

export async function findWorkspaceById(id?: string) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/workspace/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
  }
}

export async function deleteWorkspace(id?: string) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.delete(
      `${SERVER_URL}/workspace/${id}/delete`,
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

export async function resetInviteCode(id?: string) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.put(
      `${SERVER_URL}/workspace/${id}/reset-invite-code`,
      {},
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

export async function findTaskCountsByWorkspaceId(id?: string) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.get(
      `${SERVER_URL}/workspace/${id}/analytics`,
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
