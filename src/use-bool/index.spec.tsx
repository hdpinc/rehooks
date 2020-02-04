import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import useBool from './index'

const TestComponent: React.FC<{ initialValue: boolean }> = (props) => {
  const { initialValue } = props
  const [state, turnOn, turnOff] = useBool(initialValue)
  return (
    <div>
      <span data-testid={'state'}>{state ? 'on' : 'off'}</span>
      <button onClick={turnOn} data-testid={'on'}>
        on
      </button>
      <button onClick={turnOff} data-testid={'off'}>
        off
      </button>
    </div>
  )
}

it('turns on', () => {
  const { getByTestId } = render(<TestComponent initialValue={false} />)
  fireEvent.click(getByTestId('on'))
  expect(getByTestId('state').textContent).toBe('on')
})

it('turns off', () => {
  const { getByTestId } = render(<TestComponent initialValue={true} />)
  fireEvent.click(getByTestId('off'))
  expect(getByTestId('state').textContent).toBe('off')
})
