import { format, isAfter, isBefore, isSameDay, isSameMonth, parseISO, startOfMonth } from 'date-fns'
import React from 'react'
import useDate, { DateLike, UseDateReturn } from '../use-date'
import { getDateMatrixForYearMonth } from './utils'

type InputMode = 'date' | 'month' | 'year'

const initialMode: InputMode = 'date'

export type UseDatepickerOptions = {
  value: string
  max?: DateLike
  min?: DateLike
  defaultUiDate?: DateLike
  locale?: string
  weekStartsOn?: number
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export type UseDatepickerReturn = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  inputProps: any
  dateRows: DateCell[][]
  years: { label: string; value: number }[]
  months: { label: string; value: number }[]
  daysOfWeek: { label: string; value: number }[]
  uiDate: UseDateReturn
  setDateMode: () => void
  setMonthMode: () => void
  setYearMode: () => void
  mode: InputMode
}

type DateCell = {
  date: Date
  dateStr: string
  isCurrentMonth: boolean
  isWithinInterval: boolean
  isSelected: boolean
}

const normalizeDate = (date: DateLike | undefined): Date => {
  if (typeof date === 'undefined') {
    return new Date(NaN)
  }
  if (typeof date === 'string') {
    return parseISO(date)
  } else {
    return new Date(date)
  }
}

export const normalizeDateStr = (date: DateLike | undefined): string => {
  const d = normalizeDate(date)
  if (Number.isNaN(+d)) {
    // Invalid Date
    return ''
  } else {
    return format(d, 'yyyy-MM-dd')
  }
}

const range = (start: number, end: number): number[] => {
  const arr: number[] = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }

  return arr
}

const SATURDAY = new Date('2000-01-01')
const SUNDAY = new Date('2000-01-02')
const MONDAY = new Date('2000-01-03')
const TUESDAY = new Date('2000-01-04')
const WEDNESDAY = new Date('2000-01-05')
const THURSDAY = new Date('2000-01-06')
const FRIDAY = new Date('2000-01-07')

const JANUARY = new Date('2000-01-01')
const FEBRUARY = new Date('2000-02-01')
const MARCH = new Date('2000-03-01')
const APRIL = new Date('2000-04-01')
const MAY = new Date('2000-05-01')
const JUNE = new Date('2000-06-01')
const JULY = new Date('2000-07-01')
const AUGUST = new Date('2000-08-01')
const SEPTEMBER = new Date('2000-09-01')
const OCTOBER = new Date('2000-10-01')
const NOVEMBER = new Date('2000-11-01')
const DECEMBER = new Date('2000-12-01')

const useDatepicker = (options: UseDatepickerOptions): UseDatepickerReturn => {
  const {
    value,
    inputProps,
    defaultUiDate = startOfMonth(new Date()),
    locale = 'ja',
    weekStartsOn = SUNDAY.getDay(),
  } = options
  const [mode, setMode] = React.useState<InputMode>(initialMode)
  const [isOpen, setOpen] = React.useState(false)
  const uiDate = useDate(normalizeDate(defaultUiDate))
  const minDate = options.min ? normalizeDate(options.min) : undefined
  const maxDate = options.max ? normalizeDate(options.max) : undefined
  const dateRows = getDateMatrixForYearMonth<DateCell>(uiDate.year, uiDate.month, (date) => ({
    date,
    dateStr: normalizeDateStr(date),
    isCurrentMonth: isSameMonth(date, uiDate.date),
    isWithinInterval:
      (!minDate || isSameDay(date, minDate) || isAfter(date, minDate)) &&
      (!maxDate || isSameDay(date, maxDate) || isBefore(date, maxDate)),
    isSelected: !!value && isSameDay(date, normalizeDate(value)),
  }))

  const setDateMode = React.useCallback(() => {
    setMode('date')
  }, [])

  const setMonthMode = React.useCallback(() => {
    setMode('month')
  }, [])

  const setYearMode = React.useCallback(() => {
    setMode('year')
  }, [])

  const open = React.useCallback(() => setOpen(true), [])
  const close = React.useCallback(() => setOpen(false), [])
  const toggle = React.useCallback(() => setOpen((isOpen) => !isOpen), [])

  const weekdayIntl = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  const monthIntl = new Intl.DateTimeFormat(locale, { month: 'short' })

  return {
    isOpen,
    open,
    close,
    toggle,
    setDateMode,
    setMonthMode,
    setYearMode,
    inputProps: {
      readOnly: true,
      min: normalizeDateStr(minDate),
      max: normalizeDateStr(maxDate),
      value,
      ...inputProps,
    },
    dateRows,
    years: range(Math.floor(uiDate.year / 10) * 10, Math.floor(uiDate.year / 10) * 10 + 9).map((year) => ({
      label: '' + year,
      value: year,
    })),
    months: [
      { label: monthIntl.format(JANUARY), value: 0 },
      { label: monthIntl.format(FEBRUARY), value: 1 },
      { label: monthIntl.format(MARCH), value: 2 },
      { label: monthIntl.format(APRIL), value: 3 },
      { label: monthIntl.format(MAY), value: 4 },
      { label: monthIntl.format(JUNE), value: 5 },
      { label: monthIntl.format(JULY), value: 6 },
      { label: monthIntl.format(AUGUST), value: 7 },
      { label: monthIntl.format(SEPTEMBER), value: 8 },
      { label: monthIntl.format(OCTOBER), value: 9 },
      { label: monthIntl.format(NOVEMBER), value: 10 },
      { label: monthIntl.format(DECEMBER), value: 11 },
    ],
    daysOfWeek: [SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY]
      .sort((a, b) => {
        const aday = a.getDay()
        const bday = b.getDay()
        return (aday < weekStartsOn ? aday + 7 : aday) - (bday < weekStartsOn ? bday + 7 : bday)
      })
      .map((dayOfWeek) => {
        return {
          label: weekdayIntl.format(dayOfWeek),
          value: dayOfWeek.getDay(),
        }
      }),
    uiDate,
    mode,
  }
}

export default useDatepicker
