import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { createEvent } from '../testing/utils'
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
  fireEvent(getByTestId('on'), createEvent('click', { bubbles: true }))
  expect(getByTestId('state').textContent).toBe('on')
})

it('turns off', () => {
  const { getByTestId } = render(<TestComponent initialValue={true} />)
  fireEvent(getByTestId('off'), createEvent('click', { bubbles: true }))
  expect(getByTestId('state').textContent).toBe('off')
})
