export default function (column: string, sort: 'asc'|'desc' = 'asc') {
  // eslint-disable-next-line
  return function (firstEl: any, secondEl: any): number {
    if (firstEl[column] > secondEl[column]) return sort === 'asc' ? 1 : -1
    if (firstEl[column] < secondEl[column]) return sort === 'asc' ? -1 : 1
    return 0
  }
}
