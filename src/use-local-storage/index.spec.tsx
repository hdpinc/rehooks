import { act, renderHook } from '@testing-library/react-hooks'
import localStorage from './localStorage'
import useLocalStorage from './index'

jest.mock('./localStorage')

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

it('should update value', () => {
  jest.spyOn(localStorage, 'setItem')
  const { result } = renderHook(() => useLocalStorage('key', ''))
  const [_, setState] = result.current
  act(() => {
    setState('updated')
  })
  expect(result.current[0]).toBe('updated')
  expect(localStorage.getItem('key')).toBe(JSON.stringify('updated'))
})
