import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { createEvent } from '../../testing/utils'
import useToggle from './index'

it('toggle state', () => {
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
  const { getByTestId } = render(<TestComponent initialValue={false} />)
  expect(getByTestId('state').textContent).toBe('off')
  fireEvent(getByTestId('toggle'), createEvent('click', { bubbles: true }))
  expect(getByTestId('state').textContent).toBe('on')
  fireEvent(getByTestId('toggle'), createEvent('click', { bubbles: true }))
  expect(getByTestId('state').textContent).toBe('off')
})

it('set state', () => {
  const TestComponent: React.FC<{ initialValue: boolean }> = (props) => {
    const { initialValue } = props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, toggle, set] = useToggle(initialValue)
    return (
      <div>
        <span data-testid={'state'}>{state ? 'on' : 'off'}</span>
        <button onClick={() => set(true)} data-testid={'on'}>
          on
        </button>
        <button onClick={() => set(false)} data-testid={'off'}>
          off
        </button>
      </div>
    )
  }
  const { getByTestId } = render(<TestComponent initialValue={false} />)
  expect(getByTestId('state').textContent).toBe('off')
  fireEvent(getByTestId('on'), createEvent('click', { bubbles: true }))
  expect(getByTestId('state').textContent).toBe('on')
  fireEvent(getByTestId('on'), createEvent('click', { bubbles: true }))
  expect(getByTestId('state').textContent).toBe('on')
  fireEvent(getByTestId('off'), createEvent('click', { bubbles: true }))
  expect(getByTestId('state').textContent).toBe('off')
  fireEvent(getByTestId('off'), createEvent('click', { bubbles: true }))
  expect(getByTestId('state').textContent).toBe('off')
})
