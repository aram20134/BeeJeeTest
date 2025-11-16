import { fetchClient } from "../fetchClient"
import type { PageInfo } from "../types";
import type { Task, TaskCreateInput, TaskUpdateInput } from "./tasks.types"

export const TaskAPI = {
  getList: async (page = 1, perPage = 3, field = 'id', sort: "asc" | "desc", filter: Record<string, any>): Promise<{ data: Task[]; pageInfo: PageInfo }> => {
    return fetchClient.request(`/tasks?page=${page}&perPage=${perPage}&field=${field}&sort=${sort}&filter=${JSON.stringify(filter)}`, { method: "GET" })
  },

  create: async (input: TaskCreateInput): Promise<Task> => {
    return fetchClient.request(`/tasks`, { method: "POST", body: input })
  },

  update: async (id: number, input: TaskUpdateInput): Promise<Task> => {
    return fetchClient.request(`/tasks`, { method: "PUT", body: { id, ...input } })
  }
}