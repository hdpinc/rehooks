import React from 'react'

const useBool = (initialState: boolean): [boolean, () => void, () => void, () => void] => {
  const [state, setState] = React.useState(initialState)
  const turnOn = () => setState(true)
  const turnOff = () => setState(false)
  const toggle = () => setState((state) => !state)
  return [state, turnOn, turnOff, toggle]
}

export default useBool
