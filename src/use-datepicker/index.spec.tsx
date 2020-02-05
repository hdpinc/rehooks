import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from 'date-fns'
import { createEvent } from '../../testing/utils'
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
    toggle,
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
        <button onClick={toggle} data-testid={'toggle'} />
        <div data-testid={'is-open'}>{isOpen ? 'open' : 'close'}</div>
      </div>
      <div data-testid={'date-rows'}>
        {dateRows.map((row, index) => (
          <div key={index}>
            {row.map((col, index) => (
              <div key={index} data-testid={`date-col-${col.dateStr}`} data-is-within-interval={col.isWithinInterval}>
                {col.date.getDate()}
              </div>
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
    // textContent on IE contains zero-width spaces.
    expect(
      getByTestId('days-of-week')
        .textContent?.split(String.fromCharCode(8206))
        .join('')
    ).toBe('SunMonTueWedThuFriSat')
  })
})

describe('weekStartsOn', () => {
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  ;[0, 1, 2, 3, 4, 5, 6].forEach((weekStartsOn) => {
    it(`week starts on ${labels[weekStartsOn]}`, () => {
      // With locale: 'en' because there is no way to test 'ja' locale on jsdom.
      const { getByTestId } = render(<Comp locale={'en'} weekStartsOn={weekStartsOn} />)
      // textContent on IE contains zero-width spaces.
      expect(
        getByTestId('days-of-week')
          .textContent?.split(String.fromCharCode(8206))
          .join('')
      ).toBe(
        [0, 1, 2, 3, 4, 5, 6]
          .sort((a, b) => (a < weekStartsOn ? a + 7 : a) - (b < weekStartsOn ? b + 7 : b))
          .map((n) => labels[n])
          .join('')
      )
    })
  })
})

describe('months', () => {
  it('should be month names.', () => {
    // With locale: 'en' because there is no way to test 'ja' locale on jsdom.
    const { getByTestId } = render(<Comp locale={'en'} />)
    // textContent on IE contains zero-width spaces.
    expect(
      getByTestId('months')
        .textContent?.split(String.fromCharCode(8206))
        .join('')
    ).toBe('JanFebMarAprMayJunJulAugSepOctNovDec')
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
  it('should be toggled after calling "toggle".', () => {
    const { getByTestId } = render(<Comp />)
    expect(getByTestId('is-open').textContent).toBe('close')
    fireEvent(getByTestId('toggle'), createEvent('click', { bubbles: true }))
    expect(getByTestId('is-open').textContent).toBe('open')
    fireEvent(getByTestId('toggle'), createEvent('click', { bubbles: true }))
    expect(getByTestId('is-open').textContent).toBe('close')
  })
})

describe('dateRows', () => {
  const setup = (props: Partial<UseDatepickerOptions>) => {
    const { getByTestId } = render(<Comp {...props} />)
    return {
      getDateRows: () => getByTestId('date-rows'),
      getIsWithinInterval: () => getByTestId('data-is-within-interval'),
      getByDate: (date: string) => getByTestId(`date-col-${date}`),
      getIsWithinIntervalByDate: (date: string) =>
        getByTestId(`date-col-${date}`).getAttribute('data-is-within-interval'),
    }
  }
  it('should return array of dates of the target month.', () => {
    const { getDateRows } = setup({ value: '2020-01-01' })
    expect(getDateRows().textContent?.startsWith('' + startOfWeek(startOfMonth(new Date())).getDate())).toBe(true)
    expect(getDateRows().textContent?.endsWith('' + endOfWeek(endOfMonth(new Date())).getDate())).toBe(true)
  })
  it('should handle isWithinInterval when both max and min are specified.', () => {
    const { getIsWithinIntervalByDate } = setup({
      value: '2020-01-01',
      min: '2020-01-01',
      max: '2020-01-15',
      defaultUiDate: new Date('2020-01'),
    })
    expect(getIsWithinIntervalByDate('2019-12-31')).toBe('false')
    expect(getIsWithinIntervalByDate('2020-01-01')).toBe('true')
    expect(getIsWithinIntervalByDate('2020-01-15')).toBe('true')
    expect(getIsWithinIntervalByDate('2020-01-16')).toBe('false')
  })
  it('should handle isWithinInterval when max and min are Date instances.', () => {
    const { getIsWithinIntervalByDate } = setup({
      value: '2020-01-01',
      defaultUiDate: new Date('2020-01'),
      min: new Date('2020-01-01'),
      max: new Date('2020-01-15'),
    })
    expect(getIsWithinIntervalByDate('2019-12-31')).toBe('false')
    expect(getIsWithinIntervalByDate('2020-01-01')).toBe('true')
    expect(getIsWithinIntervalByDate('2020-01-15')).toBe('true')
    expect(getIsWithinIntervalByDate('2020-01-16')).toBe('false')
  })
  it('should handle isWithinInterval when only min is specified.', () => {
    const { getIsWithinIntervalByDate } = setup({
      value: '2020-01-01',
      min: '2020-01-01',
      defaultUiDate: new Date('2020-01'),
    })
    expect(getIsWithinIntervalByDate('2019-12-31')).toBe('false')
    expect(getIsWithinIntervalByDate('2020-01-01')).toBe('true')
    expect(getIsWithinIntervalByDate('2020-01-15')).toBe('true')
    expect(getIsWithinIntervalByDate('2020-01-16')).toBe('true')
  })
  it('should handle isWithinInterval when only max is specified.', () => {
    const { getIsWithinIntervalByDate } = setup({ value: '2020-01-01', max: '2020-01-15', defaultUiDate: '2020-01' })
    expect(getIsWithinIntervalByDate('2019-12-31')).toBe('true')
    expect(getIsWithinIntervalByDate('2020-01-01')).toBe('true')
    expect(getIsWithinIntervalByDate('2020-01-15')).toBe('true')
    expect(getIsWithinIntervalByDate('2020-01-16')).toBe('false')
  })
})

describe('defaultUiDate', () => {
  it('use new Date() when defaultUiDate is not specified', () => {
    const date = new Date()
    const Comp = () => {
      const { uiDate } = useDatepicker({
        value: '',
      })
      return <div data-testid={'ui-date'}>{uiDate.format('yyyy-MM')}</div>
    }
    const { getByTestId } = render(<Comp />)
    expect(getByTestId('ui-date').textContent).toBe(format(date, 'yyyy-MM'))
  })
})
