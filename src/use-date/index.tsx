/**
 * ** 変数名に関する注意事項**
 *
 * JS 標準の Date オブジェクトでは年月日の "日" のことを "date" と呼びますが、
 * この変数名では Date 型のインスタンスを指すのか "日" という数値型の値を指すのか分かりづらいため、
 * 本ライブラリでは
 *
 *   - Date 型のインスタンスのことを "date"
 *   - 年月日の "日" のことを "day"
 *   - 曜日番号のことを "dayOfWeek"
 *
 * と呼ぶことにします。
 *
 */

import { addMonths, addYears, format, parseISO, setDate, setMonth, setYear, subMonths, subYears } from 'date-fns'
import React from 'react'

export type UseDateOptions = {}

export type DateLike = Date | string | number

const MILLISECONDS_IN_HOUR = 60 * 60 * 1000
const MILLISECONDS_IN_MINUTE = 60 * 1000
const MILLISECONDS_IN_SECOND = 60

export type UseDateReturn = {
  date: Date

  // Number values
  year: number
  month: number
  day: number
  dayOfWeek: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number

  // Operation methods
  addYear: () => void
  addYears: (amount: number) => void
  subYear: () => void
  subYears: (amount: number) => void
  addMonth: () => void
  addMonths: (amount: number) => void
  subMonth: () => void
  subMonths: (amount: number) => void
  setYear: (year: number) => void
  setMonth: (month: number) => void
  setDay: (day: number) => void
  setHours: (hours: number, minutes?: number, seconds?: number, milliseconds?: number) => void
  format: (format: string) => string
}

const normalizeDate = (date: DateLike): Date => {
  return typeof date === 'string' ? parseISO(date) : new Date(date)
}

const useDate = (initialDate: DateLike, options?: UseDateOptions): UseDateReturn => {
  const [date, update] = React.useState(normalizeDate(initialDate))

  return {
    date,

    // Number values
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    dayOfWeek: date.getDay(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),

    // Operation methods
    addYear: () => {
      update((date) => addYears(date, 1))
    },
    addYears: (amount: number) => {
      update((date) => addYears(date, amount))
    },
    subYear: () => {
      update((date) => subYears(date, 1))
    },
    subYears: (amount: number) => {
      update((date) => subYears(date, amount))
    },
    addMonth: () => {
      update((date) => addMonths(date, 1))
    },
    addMonths: (amount: number) => {
      update((date) => addMonths(date, amount))
    },
    subMonth: () => {
      update((date) => subMonths(date, 1))
    },
    subMonths: (amount: number) => {
      update((date) => subMonths(date, amount))
    },
    format: (fmt: string) => {
      return format(date, fmt)
    },
    setYear: (amount: number) => {
      update((date) => setYear(date, amount))
    },
    setMonth: (amount: number) => {
      update((date) => setMonth(date, amount))
    },
    setDay: (amount: number) => {
      update((date) => setDate(date, amount))
    },
    setHours: (hours: number, minutes?: number, seconds?: number, milliseconds?: number) => {
      update(
        (date) =>
          new Date(
            date.getTime() +
              hours * MILLISECONDS_IN_HOUR +
              (minutes ?? 0) * MILLISECONDS_IN_MINUTE +
              (seconds ?? 0) * MILLISECONDS_IN_SECOND +
              (milliseconds ?? 0)
          )
      )
    },
  }
}

export default useDate
