import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { createEvent } from '../../testing/utils'
import useDate from './index'

describe('values', () => {
  const setup = (options: { date: string }) => {
    const { date: initialDate } = options

    const Comp: React.FC = () => {
      const { year, month, day, dayOfWeek, hours, minutes, seconds, milliseconds, format } = useDate(initialDate)
      return (
        <div>
          <div data-testid={'year'}>{year}</div>
          <div data-testid={'month'}>{month}</div>
          <div data-testid={'day'}>{day}</div>
          <div data-testid={'dayOfWeek'}>{dayOfWeek}</div>
          <div data-testid={'hours'}>{hours}</div>
          <div data-testid={'minutes'}>{minutes}</div>
          <div data-testid={'seconds'}>{seconds}</div>
          <div data-testid={'milliseconds'}>{milliseconds}</div>
          <div data-testid={'format'}>{format('yyyy-MM-dd')}</div>
        </div>
      )
    }

    const { getByTestId } = render(<Comp />)

    return {
      year: getByTestId('year'),
      month: getByTestId('month'),
      day: getByTestId('day'),
      dayOfWeek: getByTestId('dayOfWeek'),
      hours: getByTestId('hours'),
      minutes: getByTestId('minutes'),
      seconds: getByTestId('seconds'),
      milliseconds: getByTestId('milliseconds'),
      format: getByTestId('format'),
    }
  }

  it('each numbers', () => {
    const { year, month, day, dayOfWeek, hours, minutes, seconds, milliseconds } = setup({
      date: '2019-01-01T01:02:03',
    })
    expect(year.textContent).toBe('2019')
    expect(month.textContent).toBe('0')
    expect(day.textContent).toBe('1')
    expect(dayOfWeek.textContent).toBe('2')
    expect(hours.textContent).toBe('1')
    expect(minutes.textContent).toBe('2')
    expect(seconds.textContent).toBe('3')
    expect(milliseconds.textContent).toBe('0')
  })

  it('format', () => {
    const { format } = setup({
      date: '2019-01-01T01:02:03',
    })
    expect(format.textContent).toBe('2019-01-01')
  })
})

describe('helpers', () => {
  const setup = (options: { date: string; amount: number }) => {
    const { date: initialDate, amount } = options

    const Comp: React.FC = () => {
      const { format, setYear, setMonth, setDay, setHours, setMinutes, setSeconds } = useDate(initialDate)
      return (
        <div>
          <button data-testid={'setYear'} onClick={() => setYear(amount)} />
          <button data-testid={'setMonth'} onClick={() => setMonth(amount)} />
          <button data-testid={'setDay'} onClick={() => setDay(amount)} />
          <button data-testid={'setHours'} onClick={() => setHours(amount)} />
          <button data-testid={'setMinutes'} onClick={() => setMinutes(amount)} />
          <button data-testid={'setSeconds'} onClick={() => setSeconds(amount)} />
          <div data-testid={'format'}>{format('yyyy-MM-dd HH:mm:ss')}</div>
        </div>
      )
    }

    const { getByTestId } = render(<Comp />)

    return {
      setYear: getByTestId('setYear'),
      setMonth: getByTestId('setMonth'),
      setDay: getByTestId('setDay'),
      setHours: getByTestId('setHours'),
      setMinutes: getByTestId('setMinutes'),
      setSeconds: getByTestId('setSeconds'),
      format: getByTestId('format'),
    }
  }
  const date = '2020-01-01T01:02:03'
  ;[
    { date, name: 'setYear', amount: 2030, expected: '2030-01-01 01:02:03' },
    { date, name: 'setMonth', amount: 1, expected: '2020-02-01 01:02:03' },
    { date, name: 'setDay', amount: 2, expected: '2020-01-02 01:02:03' },
    { date, name: 'setHours', amount: 3, expected: '2020-01-01 03:02:03' },
    { date, name: 'setMinutes', amount: 4, expected: '2020-01-01 01:04:03' },
    { date, name: 'setSeconds', amount: 5, expected: '2020-01-01 01:02:05' },
  ].forEach(({ date, name, amount, expected }) => {
    it(name, () => {
      const obj = setup({ date, amount }) as any
      fireEvent(obj[name], createEvent('click', { bubbles: true }))
      expect(obj.format.textContent).toBe(expected)
    })
  })
})
