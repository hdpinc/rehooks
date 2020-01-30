import React from 'react'

const useToggle = (initialState: boolean): [boolean, () => void, (state: boolean) => void] => {
  const [state, setState] = React.useState(initialState)
  const toggle = () => setState((state) => !state)
  const set = (override: boolean) => setState(override)
  return [state, toggle, set]
}

export default useToggle
