import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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
  fireEvent.click(getByTestId('toggle'))
  expect(getByTestId('state').textContent).toBe('on')
  fireEvent.click(getByTestId('toggle'))
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
  fireEvent.click(getByTestId('on'))
  expect(getByTestId('state').textContent).toBe('on')
  fireEvent.click(getByTestId('on'))
  expect(getByTestId('state').textContent).toBe('on')
  fireEvent.click(getByTestId('off'))
  expect(getByTestId('state').textContent).toBe('off')
  fireEvent.click(getByTestId('off'))
  expect(getByTestId('state').textContent).toBe('off')
})
