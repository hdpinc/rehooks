import React from 'react'

export type UseLocalStorageResult<T> = [T, (value: T) => void, () => void]

const logError = (error: Error) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error)
  }
}

const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageResult<T> => {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      logError(error)
      return initialValue
    }
  })

  const setItem = (value: unknown) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      logError(error)
    }
  }

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      logError(error)
    }
  }

  return [storedValue, setItem, removeItem]
}

export default useLocalStorage
