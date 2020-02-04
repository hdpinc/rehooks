import React from 'react'
import { render, fireEvent, createEvent } from '@testing-library/react'
import useKeyUp from './index'

const TestComponent: React.FC<{ pressKey: string }> = (props) => {
  const [state, setState] = React.useState(false)
  useKeyUp(props.pressKey, () => {
    setState(true)
  })

  return (
    <div>
      <span data-testid={'state'}>{state ? 'on' : 'off'}</span>
    </div>
  )
}

it('handler should be called when Esc key keyup.', () => {
  const { getByTestId } = render(<TestComponent pressKey={'Esc'} />)
  const event = createEvent.keyDown(window, { key: 'Esc' })
  fireEvent(window, event)
  expect(getByTestId('state').textContent).toBe('on')
})

it('handler should not be called when another key is keyup.', () => {
  const { getByTestId } = render(<TestComponent pressKey={'Esc'} />)
  const event = createEvent.keyDown(window, { key: 'Ctrl' })
  fireEvent(window, event)
  expect(getByTestId('state').textContent).toBe('off')
})
