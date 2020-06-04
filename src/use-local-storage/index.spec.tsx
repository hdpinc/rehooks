import { act, renderHook } from '@testing-library/react-hooks'
import localStorage from './localStorage'
import useLocalStorage from './index'

afterEach(() => {
  localStorage.clear()
})

it('should return initial value', () => {
  const { result } = renderHook(() => useLocalStorage('key', ''))
  const [state] = result.current
  expect(state).toBe('')
})

it('should return stored value if one exists instead of initial value', () => {
  localStorage.setItem('key', JSON.stringify('stored'))
  const { result } = renderHook(() => useLocalStorage('key', ''))
  const [state] = result.current
  expect(state).toBe('stored')
})

describe('set', () => {
  it('should update value', () => {
    const { result } = renderHook(() => useLocalStorage('key', ''))
    const [, setState] = result.current
    act(() => {
      setState('updated')
    })
    expect(result.current[0]).toBe('updated')
    expect(localStorage.getItem('key')).toBe(JSON.stringify('updated'))
  })
})
