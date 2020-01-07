import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import useDatepicker, { UseDatepickerOptions } from '.'

const Comp: React.FC<Partial<UseDatepickerOptions> & {
  data?: Partial<{ year: number; month: number }>
}> = (props) => {
  const { data, ...rest } = props
  const { setDateMode, setMonthMode, setYearMode, uiDate, mode } = useDatepicker({
    ...rest,
  })
  return (
    <div>
      <button data-testid={'date'} onClick={setDateMode}></button>
      <button data-testid={'month'} onClick={setMonthMode}></button>
      <button data-testid={'year'} onClick={setYearMode}></button>
      <div data-testid={'mode'}>{mode}</div>
    </div>
  )
}

describe('mode', () => {
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
