import { TaskService } from "../service/tasks.service.js"

export const TaskController = {
  getList: async (req, res) => {
    const page = Number(req.query.page) || 1
    const perPage = Number(req.query.perPage) || 3
    const field = req.query.field || 'id'
    const sort = req.query.sort || 'asc'
    const filter = JSON.parse(req.query.filter || '{}')

    const { data, pageInfo } = await TaskService.getList({ page, perPage, field, sort, filter })

    res.json({ data, pageInfo })
  },

  create: async (req, res) => {
    const { name, email, text } = req.body
    const task = await TaskService.create({ name, email, text })

    res.json(task)
  },

  update: async (req, res) => {
    const id = Number(req.body.id)
    const { text, isDone } = req.body
    const previousTask = await TaskService.getOne(id)

    const updatedTask = await TaskService.update(id, {
      text,
      isDone,
      isEditedByAdmin: previousTask.isEditedByAdmin || previousTask.text !== text
    })

    res.json(updatedTask)
  }
}
