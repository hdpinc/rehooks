import React from 'react'

const useToggle = (initialState: boolean): [boolean, (state?: unknown) => void] => {
  const [state, setState] = React.useState(initialState)
  const toggle = React.useCallback(
    (nextState?: unknown) =>
      setState((state) => {
        if (typeof nextState === 'boolean') {
          return nextState
        } else {
          return !state
        }
      }),
    []
  )
  return [state, toggle]
}

export default useToggle
