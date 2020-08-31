import { act, renderHook } from '@testing-library/react-hooks'
import { useDate } from './index'

describe('values', () => {
  it('each figures', () => {
    const { result } = renderHook(() => useDate('2019-01-01T01:02:03'))
    expect(result.current.year).toBe(2019)
    expect(result.current.month).toBe(0)
    expect(result.current.day).toBe(1)
    expect(result.current.dayOfWeek).toBe(2)
    expect(result.current.hours).toBe(1)
    expect(result.current.minutes).toBe(2)
    expect(result.current.seconds).toBe(3)
    expect(result.current.milliseconds).toBe(0)
  })

  it('format', () => {
    const { result } = renderHook(() => useDate('2019-01-01T01:02:03'))
    expect(result.current.format('yyyy-MM-dd HH:mm:ss')).toBe('2019-01-01 01:02:03')
  })
})

describe('methods', () => {
  const date = '2020-01-01T01:02:03'
  const format = 'yyyy-MM-dd HH:mm:ss'
  ;[
    { date, method: 'setYear' as const, amount: 2030, expected: '2030-01-01 01:02:03' },
    { date, method: 'setMonth' as const, amount: 1, expected: '2020-02-01 01:02:03' },
    { date, method: 'setDay' as const, amount: 2, expected: '2020-01-02 01:02:03' },
    { date, method: 'setHours' as const, amount: 3, expected: '2020-01-01 03:02:03' },
    { date, method: 'setMinutes' as const, amount: 4, expected: '2020-01-01 01:04:03' },
    { date, method: 'setSeconds' as const, amount: 5, expected: '2020-01-01 01:02:05' },
    { date, method: 'addDays' as const, amount: 6, expected: '2020-01-07 01:02:03' },
    { date, method: 'subDays' as const, amount: 6, expected: '2019-12-26 01:02:03' },
    { date, method: 'addMonths' as const, amount: 7, expected: '2020-08-01 01:02:03' },
    { date, method: 'subMonths' as const, amount: 7, expected: '2019-06-01 01:02:03' },
    { date, method: 'addYears' as const, amount: 8, expected: '2028-01-01 01:02:03' },
    { date, method: 'subYears' as const, amount: 8, expected: '2012-01-01 01:02:03' },
  ].forEach(({ date, method, amount, expected }) => {
    it(method, () => {
      const { result } = renderHook(() => useDate(date))
      act(() => {
        result.current[method](amount)
      })
      expect(result.current.format(format)).toBe(expected)
    })
  })
  ;[
    { date, method: 'addDay' as const, expected: '2020-01-02 01:02:03' },
    { date, method: 'subDay' as const, expected: '2019-12-31 01:02:03' },
    { date, method: 'addMonth' as const, expected: '2020-02-01 01:02:03' },
    { date, method: 'subMonth' as const, expected: '2019-12-01 01:02:03' },
    { date, method: 'addYear' as const, expected: '2021-01-01 01:02:03' },
    { date, method: 'subYear' as const, expected: '2019-01-01 01:02:03' },
  ].forEach(({ date, method, expected }) => {
    it(method, () => {
      const { result } = renderHook(() => useDate(date))
      act(() => {
        result.current[method]()
      })
      expect(result.current.format(format)).toBe(expected)
    })
  })
})
