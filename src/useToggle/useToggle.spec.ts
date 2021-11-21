import { act, renderHook } from '@testing-library/react-hooks'
import { useToggle } from './useToggle'

it('toggle state', () => {
  const { result } = renderHook(() => useToggle(false))
  act(() => {
    result.current[1]()
  })
  expect(result.current[0]).toBe(true)
  act(() => {
    result.current[1]()
  })
  expect(result.current[0]).toBe(false)
})

it('set state', () => {
  const { result } = renderHook(() => useToggle(false))
  act(() => {
    result.current[1](false)
  })
  expect(result.current[0]).toBe(false)
  act(() => {
    result.current[1](true)
  })
  expect(result.current[0]).toBe(true)
})
