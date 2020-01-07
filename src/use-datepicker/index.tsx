import { format, parseISO, startOfMonth } from 'date-fns'
import React from 'react'
import useDate, { DateLike } from '../use-date'
import { useBool } from '../index'
import { getDateMatrixForYearMonth } from './utils'

type InputMode = 'date' | 'month' | 'year'

const initialMode: InputMode = 'date'

export type UseDatepickerOptions = {
  locale?: string
  initialValue?: DateLike
}

export type UseDatepickerReturn = {
  enterDateMode: () => void
  enterMonthMode: () => void
  enterYearMode: () => void
}

const normalizeDate = (date: DateLike): Date => {
  if (typeof date === 'string') {
    return parseISO(date)
  } else {
    return new Date(date)
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

const useDatepicker = (options: UseDatepickerOptions) => {
  const { initialValue, locale = 'ja' } = options
  const [mode, setMode] = React.useState<InputMode>(initialMode)
  const [rawValue, setRawValue] = React.useState<string>(
    initialValue === undefined || initialValue === '' ? '' : format(normalizeDate(initialValue), 'yyyy-MM-dd')
  )
  const [isOpen, open, close] = useBool(false)
  const uiDate = useDate(startOfMonth(normalizeDate(new Date())))
  const rows = getDateMatrixForYearMonth(uiDate.year, uiDate.month)

  const setDateMode = React.useCallback(() => {
    setMode('date')
  }, [setMode])

  const setMonthMode = React.useCallback(() => {
    setMode('month')
  }, [setMode])

  const setYearMode = React.useCallback(() => {
    setMode('year')
  }, [setMode])

  const weekdayIntl = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  const monthIntl = new Intl.DateTimeFormat(locale, { month: 'short' })
  const setValue = (date: DateLike) => {
    setRawValue(date === '' ? '' : format(normalizeDate(date), 'yyyy-MM-dd'))
  }
  const clearValue = () => {
    setRawValue('')
  }

  return {
    isOpen,
    open,
    close,
    setValue,
    clearValue,
    setDateMode,
    setMonthMode,
    setYearMode,
    inputProps: {
      onFocus: open,
      onClick: open,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setRawValue(e.target.value),
      value: rawValue,
    },
    rows,
    years: range(Math.floor(uiDate.year / 10) * 10, Math.floor(uiDate.year / 10) * 10 + 9).map((year) => ({
      label: year,
      value: year,
    })),
    months: [
      { label: monthIntl.format(JANUARY), month: 0 },
      { label: monthIntl.format(FEBRUARY), month: 1 },
      { label: monthIntl.format(MARCH), month: 2 },
      { label: monthIntl.format(APRIL), month: 3 },
      { label: monthIntl.format(MAY), month: 4 },
      { label: monthIntl.format(JUNE), month: 5 },
      { label: monthIntl.format(JULY), month: 6 },
      { label: monthIntl.format(AUGUST), month: 7 },
      { label: monthIntl.format(SEPTEMBER), month: 8 },
      { label: monthIntl.format(OCTOBER), month: 9 },
      { label: monthIntl.format(NOVEMBER), month: 10 },
      { label: monthIntl.format(DECEMBER), month: 11 },
    ],
    headerRow: [
      { label: weekdayIntl.format(SUNDAY), day: 0 },
      { label: weekdayIntl.format(MONDAY), day: 1 },
      { label: weekdayIntl.format(TUESDAY), day: 2 },
      { label: weekdayIntl.format(WEDNESDAY), day: 3 },
      { label: weekdayIntl.format(THURSDAY), day: 4 },
      { label: weekdayIntl.format(FRIDAY), day: 5 },
      { label: weekdayIntl.format(SATURDAY), day: 6 },
    ],
    uiDate,
    mode,
  }
}

export default useDatepicker
