import { act, renderHook } from '@testing-library/react-hooks'
import { useArray } from './index'

const init = ['1', 'abc', 1, 34, undefined, null]

it('toggle', () => {
  const { result } = renderHook(() => useArray(init))

  // remove '1'
  expect(result.current.state).toEqual(init)
  act(() => {
    result.current.toggle('1')
  })
  expect(result.current.state).toEqual(['abc', 1, 34, undefined, null])

  // remove 1
  act(() => {
    result.current.toggle(1)
  })
  expect(result.current.state).toEqual(['abc', 34, undefined, null])

  // remove null
  act(() => {
    result.current.toggle(null)
  })
  expect(result.current.state).toEqual(['abc', 34, undefined])

  // add 1
  act(() => {
    result.current.toggle(1)
  })
  expect(result.current.state).toEqual(['abc', 34, undefined, 1])

  // remove undefined
  act(() => {
    result.current.toggle(undefined)
  })
  expect(result.current.state).toEqual(['abc', 34, 1])

  // add null
  act(() => {
    result.current.toggle(null)
  })
  expect(result.current.state).toEqual(['abc', 34, 1, null])
})

it('clear and reset', () => {
  const { result } = renderHook(() => useArray(init))

  // clear
  act(() => {
    result.current.clear()
  })
  expect(result.current.state).toEqual([])

  // reset
  act(() => {
    result.current.reset()
  })
  expect(result.current.state).toEqual(init)
})
