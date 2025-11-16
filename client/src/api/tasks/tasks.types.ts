export interface Task {
  id: number
  name: string
  email: string
  text: string
  isDone: boolean
  isEditedByAdmin: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TaskCreateInput {
  name: string
  email: string
  text: string
}

export interface TaskUpdateInput {
  text?: string
  isDone?: boolean
}