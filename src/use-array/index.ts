import React from 'react'

const useArray = <T extends any>(
  initialState: T[]
): { state: T[]; handleValue: (value: T) => void; reset: () => void; deleteAll: () => void } => {
  const [state, setState] = React.useState<T[]>(initialState)

  const handleValue = (value: T) => {
    setState((prev) => {
      const cur = [...prev]

      if (cur.includes(value)) {
        return cur.filter((_) => _ !== value)
      } else {
        cur.push(value)
        return cur
      }
    })
  }

  const reset = () => {
    setState(initialState)
  }

  const deleteAll = () => {
    setState([])
  }

  return { state, handleValue, reset, deleteAll }
}

export default useArray
