import { prisma } from "../prisma.js"
import { buildOrderBy } from "../utils/buildOrderBy.js"
import { buildPageInfoFromCount } from "../utils/buildPageInfoFromCount.js"
import { buildSkipFromPagePerPage } from "../utils/buildSkipFromPagePerPage.js"
import { buildWhereFromFilter } from "../utils/buildWhereFromFilter.js"
import { BadUserInputError } from "../utils/errors.js"

export const TaskService = {
  getList: async ({ page, perPage, field, sort, filter }) => {
    const skip = buildSkipFromPagePerPage(page, perPage)
    const where = buildWhereFromFilter(filter)
    const orderBy = buildOrderBy(field, sort)

    const [data, count] = await Promise.all([
      prisma.task.findMany({
        skip,
        where,
        take: perPage,
        orderBy
      }),
      prisma.task.count({ where })
    ])

    const pageInfo = buildPageInfoFromCount(count, page, perPage, data)

    return { data, pageInfo }
  },
  getOne: async (id) => {
    return prisma.task.findUnique({ where: { id } })
  },

  create: async ({ name, email, text }) => {
    return prisma.task.create({ data: { name, email, text } })
  },

  update: async (id, data) => {
    const task = await prisma.task.findUnique({ where: { id } })

    if (!task) throw new BadUserInputError("Задача не найдена", { id })

    return prisma.task.update({
      where: { id },
      data
    })
  }
}
