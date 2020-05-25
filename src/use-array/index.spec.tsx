import { act, renderHook } from '@testing-library/react-hooks'
import useArray from './index'

const init = ['1', 'abc', 1, 34, undefined, null]

it('handle value', () => {
  const { result } = renderHook(() => useArray(init))

  // remove '1'
  expect(result.current.state.includes('1')).toBe(true)
  act(() => {
    result.current.handleValue('1')
  })
  expect(result.current.state.length).toBe(5)
  ;['abc', 1, 34, undefined, null].map((v) => {
    expect(result.current.state.includes(v)).toBe(true)
  })
  expect(result.current.state.includes('1')).toBe(false)

  // remove 1
  expect(result.current.state.includes(1)).toBe(true)
  act(() => {
    result.current.handleValue(1)
  })
  expect(result.current.state.length).toBe(4)
  ;['abc', 34, undefined, null].map((v) => {
    expect(result.current.state.includes(v)).toBe(true)
  })
  expect(result.current.state.includes(1)).toBe(false)

  // remove null
  expect(result.current.state.includes(null)).toBe(true)
  act(() => {
    result.current.handleValue(null)
  })
  expect(result.current.state.length).toBe(3)
  ;['abc', undefined, 34].map((v) => {
    expect(result.current.state.includes(v)).toBe(true)
  })
  expect(result.current.state.includes(null)).toBe(false)

  // add 1
  expect(result.current.state.includes(1)).toBe(false)
  act(() => {
    result.current.handleValue(1)
  })
  expect(result.current.state.length).toBe(4)
  ;['abc', 34, undefined, 1].map((v) => {
    expect(result.current.state.includes(v)).toBe(true)
  })
  expect(result.current.state.includes(1)).toBe(true)

  // remove undefined
  expect(result.current.state.includes(undefined)).toBe(true)
  act(() => {
    result.current.handleValue(undefined)
  })
  expect(result.current.state.length).toBe(3)
  ;['abc', 34, 1].map((v) => {
    expect(result.current.state.includes(v)).toBe(true)
    expect(result.current.state.includes(undefined)).toBe(false)
  })

  // add null
  expect(result.current.state.includes(null)).toBe(false)
  act(() => {
    result.current.handleValue(null)
  })
  expect(result.current.state.length).toBe(4)
  ;['abc', 34, 1, null].map((v) => {
    expect(result.current.state.includes(v)).toBe(true)
  })
  expect(result.current.state.includes(null)).toBe(true)
})

it('delete all and reset', () => {
  const { result } = renderHook(() => useArray(init))

  // deleteAll
  act(() => {
    result.current.deleteAll()
  })
  expect(result.current.state.length).toBe(0)

  // reset
  act(() => {
    result.current.reset()
  })
  expect(result.current.state.length).toBe(6)
  init.map((v) => {
    expect(result.current.state.includes(v)).toBe(true)
  })
})
