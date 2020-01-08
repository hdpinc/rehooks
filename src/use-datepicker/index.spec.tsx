import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { createEvent } from '../testing/utils'
import useDatepicker, { UseDatepickerOptions } from './index'

const Comp: React.FC<Partial<UseDatepickerOptions>> = (props) => {
  const {
    setDateMode,
    setMonthMode,
    setYearMode,
    mode,
    uiDate,
    daysOfWeek,
    months,
    years,
    isOpen,
    open,
    close,
    dateRows,
  } = useDatepicker({
    value: '',
    ...props,
  })
  return (
    <div>
      <div>
        <button data-testid={'date'} onClick={setDateMode}></button>
        <button data-testid={'month'} onClick={setMonthMode}></button>
        <button data-testid={'year'} onClick={setYearMode}></button>
        <div data-testid={'mode'}>{mode}</div>
      </div>
      <div data-testid={'days-of-week'}>
        {daysOfWeek.map(({ label, value }) => (
          <div key={value}>{label}</div>
        ))}
      </div>
      <div data-testid={'months'}>
        {months.map(({ label, value }) => (
          <div key={value}>{label}</div>
        ))}
      </div>
      <div data-testid={'years'}>
        <button data-testid={'set-year'} onClick={() => uiDate.setYear(2035)} />
        {years.map(({ label, value }) => (
          <div key={value}>{label}</div>
        ))}
      </div>
      <div>
        <button onClick={open} data-testid={'open'} />
        <button onClick={close} data-testid={'close'} />
        <div data-testid={'is-open'}>{isOpen ? 'open' : 'close'}</div>
      </div>
      <div data-testid={'date-rows'}>
        {dateRows.map((row, index) => (
          <div key={index}>
            {row.map((col, index) => (
              <div key={index}>{col.date.getDate()}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

describe('mode', () => {
  it(`enter date mode`, () => {
    const { getByTestId } = render(<Comp />)
    fireEvent(getByTestId('date'), createEvent('click', { bubbles: true }))
    expect(getByTestId('mode').textContent).toBe('date')
  })
  it(`enter month mode`, () => {
    const { getByTestId } = render(<Comp />)
    fireEvent(getByTestId('month'), createEvent('click', { bubbles: true }))
    expect(getByTestId('mode').textContent).toBe('month')
  })
  it(`enter year mode`, () => {
    const { getByTestId } = render(<Comp />)
    fireEvent(getByTestId('year'), createEvent('click', { bubbles: true }))
    expect(getByTestId('mode').textContent).toBe('year')
  })
})

describe('daysOfWeek', () => {
  it('should be week names.', () => {
    // With locale: 'en' because there is no way to test 'ja' locale on jsdom.
    const { getByTestId } = render(<Comp locale={'en'} />)
    expect(getByTestId('days-of-week').textContent).toEqual('SunMonTueWedThuFriSat')
  })
})

describe('months', () => {
  it('should be month names.', () => {
    // With locale: 'en' because there is no way to test 'ja' locale on jsdom.
    const { getByTestId } = render(<Comp locale={'en'} />)
    expect(getByTestId('months').textContent).toEqual('JanFebMarAprMayJunJulAugSepOctNovDec')
  })
})

describe('years', () => {
  it('should be years that can be selected.', () => {
    const { getByTestId } = render(<Comp value={'2020-01-01'} />)
    expect(getByTestId('years').textContent).toBe('2020202120222023202420252026202720282029')
  })
  it('', () => {
    const { getByTestId } = render(<Comp value={'2020-01-01'} />)
    fireEvent(getByTestId('set-year'), createEvent('click', { bubbles: true }))
    expect(getByTestId('years').textContent).toBe('2030203120322033203420352036203720382039')
  })
})

describe('isOpen', () => {
  it('should be true after calling "open".', () => {
    const { getByTestId } = render(<Comp />)
    fireEvent(getByTestId('open'), createEvent('click', { bubbles: true }))
    expect(getByTestId('is-open').textContent).toBe('open')
  })
  it('should be false after calling "close".', () => {
    const { getByTestId } = render(<Comp />)
    fireEvent(getByTestId('open'), createEvent('click', { bubbles: true }))
    fireEvent(getByTestId('close'), createEvent('click', { bubbles: true }))
    expect(getByTestId('is-open').textContent).toBe('close')
  })
})

describe('dateRows', () => {
  it('should return array of dates of the target month.', () => {
    const { getByTestId } = render(<Comp value={'2020-01-01'} />)
    expect(getByTestId('date-rows').textContent).toBe('293031123456789101112131415161718192021222324252627282930311')
  })
})
