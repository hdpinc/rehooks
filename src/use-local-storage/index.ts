import React from 'react'
import localStorage from './localStorage'

export type UseLocalStorageResult<T> = [T, (value: T) => void]

const logError = (error: Error) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error)
  }
}

const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageResult<T> => {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      logError(error)
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      logError(error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
