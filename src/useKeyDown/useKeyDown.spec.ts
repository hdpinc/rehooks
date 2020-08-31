import { fireEvent } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import { createEvent } from '../../testing/utils'
import { useKeyDown } from './index'

it('callback should be called when Esc key keydown.', () => {
  const fn = jest.fn()
  renderHook(() => useKeyDown('Esc', fn))
  act(() => {
    const event = createEvent('keydown', { bubbles: true })
    event.key = 'Esc'
    fireEvent(window, event)
  })
  expect(fn).toHaveBeenCalled()
})

it('handler should not be called when another key is keydown.', () => {
  const fn = jest.fn()
  renderHook(() => useKeyDown('Esc', fn))
  act(() => {
    const event = createEvent('keydown', { bubbles: true })
    event.key = 'Ctrl'
    fireEvent(window, event)
  })
  expect(fn).not.toHaveBeenCalled()
})
