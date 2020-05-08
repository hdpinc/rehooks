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

import {
  addMonths,
  addYears,
  addDays,
  format,
  parseISO,
  setDate,
  setMonth,
  setYear,
  subMonths,
  subYears,
  subDays,
} from 'date-fns'
import React from 'react'

export type UseDateOptions = {}

export type DateLike = Date | string | number

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
  addDay: () => void
  addDays: (amount: number) => void
  subDay: () => void
  subDays: (amount: number) => void
  setYear: (year: number) => void
  setMonth: (month: number) => void
  setDay: (day: number) => void
  setHours: (hours: number, minutes?: number, seconds?: number, milliseconds?: number) => void
  setMinutes: (minutes: number, seconds?: number, milliseconds?: number) => void
  setSeconds: (seconds: number, milliseconds?: number) => void
  setMilliSeconds: (milliseconds: number) => void
  format: (format: string) => string
}

const normalizeDate = (date: DateLike): Date => {
  return typeof date === 'string' ? parseISO(date) : new Date(date)
}

const useDate = (
  initialDate: DateLike,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options?: UseDateOptions
): UseDateReturn => {
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
    addDay: () => {
      update((date) => addDays(date, 1))
    },
    addDays: (amount: number) => {
      update((date) => addDays(date, amount))
    },
    subDay: () => {
      update((date) => subDays(date, 1))
    },
    subDays: (amount: number) => {
      update((date) => subDays(date, amount))
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
    setHours: (hours: number, ...rest) => {
      update((date) => new Date(new Date(date).setHours(hours, ...rest)))
    },
    setMinutes: (minutes: number, ...rest) => {
      update((date) => new Date(new Date(date).setMinutes(minutes, ...rest)))
    },
    setSeconds: (seconds: number, ...rest) => {
      update((date) => new Date(new Date(date).setSeconds(seconds, ...rest)))
    },
    setMilliSeconds: (milliseconds: number) => {
      update((date) => new Date(new Date(date).setMilliseconds(milliseconds)))
    },
  }
}

export default useDate
