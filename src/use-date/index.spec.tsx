import { act, renderHook } from '@testing-library/react-hooks'
import useDate from './index'

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
  ].forEach(({ date, method, amount, expected }) => {
    it(date, () => {
      const { result } = renderHook(() => useDate(date))
      act(() => {
        result.current[method](amount)
      })
      expect(result.current.format(format)).toBe(expected)
    })
  })
})
