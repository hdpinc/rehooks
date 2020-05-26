import React from 'react'

const useArray = <T extends any>(
  initialState: T[]
): { state: T[]; toggle: (value: T) => void; reset: () => void; clear: () => void } => {
  const [state, setState] = React.useState<T[]>(initialState)

  const toggle = (value: T) => {
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

  const clear = () => {
    setState([])
  }

  return { state, toggle, reset, clear }
}

export default useArray
