import { addDays, getDay, getDaysInMonth, startOfWeek } from 'date-fns'

/**
 * カレンダー作る用
 */
export const getDateMatrixForYearMonth = <T = Date>(
  year: number,
  month: number,
  mapper: (date: Date) => T = (date) => (date as any) as T
): T[][] => {
  const startDate = startOfWeek(new Date(year, month, 1))
  const startOfMonth = new Date(year, month, 1)
  const rows = Math.ceil((getDaysInMonth(startOfMonth) + getDay(startOfMonth)) / 7)
  const cols = 7
  const length = rows * cols
  return (
    Array.from({ length })
      // create a list of dates
      .map((_, index) => mapper(addDays(startDate, index)))
      // fold the array into a matrix
      .reduce<any[][]>(
        (matrix, current, index, days) =>
          !(index % cols !== 0) ? [...matrix, days.slice(index, index + cols)] : matrix,
        []
      )
  )
}

export const range = (start: number, end: number): number[] => {
  const arr: number[] = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }

  return arr
}
