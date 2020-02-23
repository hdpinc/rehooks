import { fireEvent } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import { createEvent } from '../../testing/utils'
import useKeyUp from './index'

it('callback should be called when Esc key keyup.', () => {
  const fn = jest.fn()
  renderHook(() => useKeyUp('Esc', fn))
  act(() => {
    const event = createEvent('keyup', { bubbles: true })
    event.key = 'Esc'
    fireEvent(window, event)
  })
  expect(fn).toHaveBeenCalled()
})

it('handler should not be called when another key is keyup.', () => {
  const fn = jest.fn()
  renderHook(() => useKeyUp('Esc', fn))
  act(() => {
    const event = createEvent('keyup', { bubbles: true })
    event.key = 'Ctrl'
    fireEvent(window, event)
  })
  expect(fn).not.toHaveBeenCalled()
})
