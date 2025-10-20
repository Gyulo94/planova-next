"use server";

import { auth } from "@/auth";
import axios from "axios";
import z from "zod/v3";
import { SERVER_URL } from "../constants";
import { TaskFilterOptions } from "../types";
import { StatusTypes, TaskFormSchema } from "../validations";

export async function createTask(values: z.infer<typeof TaskFormSchema>) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.post(`${SERVER_URL}/task/create`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
  }
}

export async function findTasksByProjectId(
  projectId?: string,
  filterOptions?: TaskFilterOptions
) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(
      `${SERVER_URL}/task/project/${projectId}/all`,
      {
        params: filterOptions,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export async function findTasksByWorkspaceId(
  workspaceId?: string,
  filterOptions?: TaskFilterOptions
) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(
      `${SERVER_URL}/task/workspace/${workspaceId}/all`,
      {
        params: filterOptions,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export async function findTaskById(id?: string) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/task/${id}`, {
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

export async function updateTask(
  id?: string,
  values?: z.infer<typeof TaskFormSchema>
) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.put(
      `${SERVER_URL}/task/${id}/update`,
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

export async function bulkUpdateTask(
  values?: {
    id: string;
    status: z.infer<typeof StatusTypes>;
    position: number;
  }[]
) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;

  try {
    const response = await axios.put(`${SERVER_URL}/task/bulk-update`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
  }
}

export async function deleteTask(id?: string) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.delete(`${SERVER_URL}/task/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
  }
}
