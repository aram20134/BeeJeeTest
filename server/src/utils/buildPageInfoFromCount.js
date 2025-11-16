export function buildPageInfoFromCount(countOrNull, page, perPage, data) {

  const count = countOrNull === false || countOrNull === null || countOrNull === undefined ? (page - 1) * perPage + perPage * (data.length < perPage ? 1 : 3) : countOrNull
  const totalPagesWhole = count % perPage
  const totalPagesRemainder = (count / perPage) >> 0
  const totalPages = totalPagesWhole > 0 ? totalPagesRemainder + 1 : totalPagesRemainder

  const result = {
    totalPages: totalPages,
    totalItems: count,
    page: page,
    perPage: perPage,
    hasNextPage: totalPages > page,
    hasPreviousPage: page > 1
  }

  return result
}