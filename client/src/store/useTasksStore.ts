import { create } from "zustand"
import { TaskAPI } from "../api/tasks/tasks.api"
import type { Task, TaskCreateInput } from "../api/tasks/tasks.types"

interface TasksState {
  items: Task[]
  page: number
  perPage: number
  totalItems: number
  sortField: string
  sort: "asc" | "desc"
  isLoading: boolean
  error: any
  createSuccess: boolean | null
  filter: Record<string, any>
  totalPages: number
  editTaskId: number | null
  editCreateData: Record<string, any> | null
  createModalOpen: boolean

  fetchTasks: () => Promise<void>
  setPage: (page: number) => void
  setSort: (field: TasksState["sortField"]) => void
  createTask: () => Promise<void>
  updateTask: () => Promise<void>
  setFilter: (filter: Record<string, any>) => void
  setEditingTask: (task: Task) => void
  setText: (value: string) => void
  setIsDone: (value: string) => void
  setEmail: (value: string) => void
  setName: (value: string) => void
  cancelEditingTask: () => void
  setCreateModalOpen: () => void
  closeCreateModal: () => void
}

export const useTasksStore = create<TasksState>((set, get) => ({
  items: [],
  page: 1,
  perPage: 3,
  totalPages: 1,
  totalItems: 0,
  sortField: 'name',
  sort: 'asc',
  isLoading: false,
  error: null,
  createSuccess: null,
  filter: {},
  editTaskId: null,
  editCreateData: null,
  createModalOpen: false,

  setText: value => set({ editCreateData: { ...get().editCreateData, text: value } }),
  setIsDone: value => set({ editCreateData: { ...get().editCreateData, isDone: value } }),
  setEmail: value => set({ editCreateData: { ...get().editCreateData, email: value } }),
  setName: value => set({ editCreateData: { ...get().editCreateData, name: value } }),

  setCreateModalOpen: () => {
    set({ createModalOpen: true, editCreateData: null, createSuccess: null })
  },
  closeCreateModal: () => {
    set({ createModalOpen: false, editCreateData: null, createSuccess: null })
  },

  fetchTasks: async () => {
    const { page, perPage, sortField, sort, filter } = get()

    set({ isLoading: true })

    try {
      const data = await TaskAPI.getList(page, perPage, sortField, sort, filter)

      set({
        items: data.data,
        totalItems: data.pageInfo.totalItems,
        isLoading: false,
        totalPages: data.pageInfo.totalPages
      })
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
    }
  },

  setPage: page => {
    set({ page })
    get().fetchTasks()
  },
  setFilter: (filter: Record<string, any>) => {
    set({ filter, page: 1 })
    get().fetchTasks()
  },

  setSort: (field: string) => {
    set(state => {
      const newOrder = state.sortField === field && state.sort === "asc" ? "desc" : "asc"
      return { sortField: field, sort: newOrder }
    })
    get().fetchTasks()
  },

  createTask: async () => {
    const { editCreateData } = get()

    try {
      await TaskAPI.create(editCreateData as TaskCreateInput)
      set({ createSuccess: true })
      await new Promise(resolve => setTimeout(resolve, 1000));
      get().closeCreateModal()
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
    }
    get().fetchTasks()
  },

  setEditingTask: (task: Task) => {
    set({ editTaskId: task.id, editCreateData: task, error: null })
  },
  cancelEditingTask: () => {
    set({ editTaskId: null, editCreateData: null, error: null })
  },

  updateTask: async () => {
    const { fetchTasks, editCreateData } = get()
    if (!editCreateData) return
    try {
      await TaskAPI.update(editCreateData.id, editCreateData)
      set({ editTaskId: null, editCreateData: null })
      fetchTasks()
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
    }
  },
}))
