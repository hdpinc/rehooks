import { renderHook, act } from '@testing-library/react-hooks'
import useBool from './index'

it('turns on', () => {
  const { result } = renderHook(() => useBool(false))
  act(() => {
    result.current[1]()
  })
  expect(result.current[0]).toBe(true)
})

it('turns off', () => {
  const { result } = renderHook(() => useBool(true))
  act(() => {
    result.current[2]()
  })
  expect(result.current[0]).toBe(false)
})
