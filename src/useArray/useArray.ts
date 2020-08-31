import React from 'react'

export const useArray = <T extends any>(
  initialState: T[]
): { state: T[]; toggle: (value: T) => void; reset: () => void; clear: () => void } => {
  const [state, setState] = React.useState<T[]>(initialState)

  const toggle = React.useCallback((value: T) => {
    setState((prev) => {
      const cur = [...prev]

      if (cur.includes(value)) {
        return cur.filter((_) => _ !== value)
      } else {
        cur.push(value)
        return cur
      }
    })
  }, [])

  const reset = React.useCallback(() => {
    setState(initialState)
  }, [initialState])

  const clear = React.useCallback(() => {
    setState([])
  }, [])

  return { state, toggle, reset, clear }
}
