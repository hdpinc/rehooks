import { fireEvent, render } from '@testing-library/react'
import { format } from 'date-fns'
import React from 'react'
import useDatepicker, { UseDatepickerOptions } from '.'

const Comp: React.FC<Partial<UseDatepickerOptions> & {
  data?: Partial<{ year: number; month: number }>
}> = (props) => {
  const { data, ...rest } = props
  const { enterDateMode, enterMonthMode, enterYearMode, setUiYear, setUiMonth, state } = useDatepicker({
    ...rest,
  })
  return (
    <div>
      <button data-testid={'date'} onClick={enterDateMode}></button>
      <button data-testid={'month'} onClick={enterMonthMode}></button>
      <button data-testid={'year'} onClick={enterYearMode}></button>
      <button data-testid={'setUiYear'} onClick={() => setUiYear(data?.year ?? 0)}></button>
      <button data-testid={'setUiMonth'} onClick={() => setUiMonth(data?.month ?? 0)}></button>
      <div data-testid={'mode'}>{state.inputMode}</div>
      <div data-testid={'uiDate'}>{format(state.uiDate, 'yyyy-MM-dd')}</div>
    </div>
  )
}

describe('state: inputMode', () => {
  it(`enter date mode`, () => {
    const { getByTestId } = render(<Comp />)
    fireEvent.click(getByTestId('date'))
    expect(getByTestId('mode').textContent).toBe('date')
  })
  it(`enter month mode`, () => {
    const { getByTestId } = render(<Comp />)
    fireEvent.click(getByTestId('month'))
    expect(getByTestId('mode').textContent).toBe('month')
  })
  it(`enter year mode`, () => {
    const { getByTestId } = render(<Comp />)
    fireEvent.click(getByTestId('year'))
    expect(getByTestId('mode').textContent).toBe('year')
  })
})

describe('state: uiDate', () => {
  it(`setUIYear`, () => {
    const { getByTestId } = render(<Comp today={'2019-01-01'} data={{ year: 2020 }} />)
    fireEvent.click(getByTestId('setUiYear'))
    expect(getByTestId('uiDate').textContent).toBe('2020-01-01')
  })
  it(`setMonth`, () => {
    const { getByTestId } = render(<Comp today={'2019-01-01'} data={{ month: 2 }} />)
    fireEvent.click(getByTestId('setUiMonth'))
    expect(getByTestId('uiDate').textContent).toBe('2019-03-01')
  })
})
