import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { createEvent } from '../testing/utils'
import useToggle from './index'

const TestComponent: React.FC<{ initialValue: boolean }> = (props) => {
  const { initialValue } = props
  const [state, toggle] = useToggle(initialValue)
  return (
    <div>
      <span data-testid={'state'}>{state ? 'on' : 'off'}</span>
      <button onClick={toggle} data-testid={'toggle'}>
        toggle
      </button>
    </div>
  )
}

it('toggle state', () => {
  const { getByTestId } = render(<TestComponent initialValue={false} />)
  expect(getByTestId('state').textContent).toBe('off')
  fireEvent(getByTestId('toggle'), createEvent('click', { bubbles: true }))
  expect(getByTestId('state').textContent).toBe('on')
  fireEvent(getByTestId('toggle'), createEvent('click', { bubbles: true }))
  expect(getByTestId('state').textContent).toBe('off')
})