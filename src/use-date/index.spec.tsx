import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import useDate from './index'

const setup = (options: { date: string; amount?: number }) => {
  const { date: initialDate, amount } = options

  const Comp: React.FC = () => {
    const { year, month, day, dayOfWeek, hours, minutes, seconds, milliseconds, setHours, format } = useDate(
      initialDate
    )
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
        <button data-testid={'setHours'} onClick={() => setHours(amount ?? 0)} />
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
    setHours: getByTestId('setHours'),
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
