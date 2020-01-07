import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import useDate from './index'

const setup = (options: { date: string; format?: string; amount?: number }) => {
  const { date: initialDate, format, amount } = options

  const Comp: React.FC = () => {
    const {
      year,
      month,
      day,
      dayOfWeek,
      hours,
      minutes,
      seconds,
      milliseconds,
      formattedDate,
      setHours,
    } = useDate(initialDate, { format })
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
        <div data-testid={'date'}>{formattedDate}</div>
        <button data-testid={'setHours'} onClick={() => setHours(amount ?? 0)} />
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
    formattedDate: getByTestId('date'),
    setHours: getByTestId('setHours'),
  }
}

it('should return formattedDate as specified format.', () => {
  const { formattedDate } = setup({ date: '2019-01-01T12:00:00', format: 'yyyy/MM/dd HH:mm:ss' })
  expect(formattedDate.textContent).toBe('2019/01/01 12:00:00')
})

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

it('setHours', () => {
  const { formattedDate, setHours } = setup({ date: '2019-01-01T00:00:00', format: 'yyyy-MM-dd HH:mm:ss', amount: 2 })
  fireEvent.click(setHours)
  expect(formattedDate.textContent).toBe('2019-01-01 02:00:00')
})
