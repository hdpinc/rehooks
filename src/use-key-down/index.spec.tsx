import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import useKeyDown from './index'

const TestComponent: React.FC<{ pressKey: string }> = (props) => {
  const [state, setState] = React.useState(false)
  useKeyDown(props.pressKey, () => {
    setState(true)
  })

  return (
    <div>
      <span data-testid={'state'}>{state ? 'on' : 'off'}</span>
    </div>
  )
}

it('handler should be called when Esc keydown.', () => {
  const { getByTestId } = render(<TestComponent pressKey={'Esc'} />)
  fireEvent.keyDown(window, { key: 'Esc' })
  expect(getByTestId('state').textContent).toBe('on')
})

it('handler should not be called when another key keydown.', () => {
  const { getByTestId } = render(<TestComponent pressKey={'Esc'} />)
  fireEvent.keyDown(window, { key: 'Ctrl' })
  expect(getByTestId('state').textContent).toBe('off')
})
