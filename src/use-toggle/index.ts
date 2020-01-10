import React from 'react'

const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [state, setState] = React.useState(initialState)
  const toggle = () => setState((state) => !state)
  return [state, toggle]
}

export default useToggle
