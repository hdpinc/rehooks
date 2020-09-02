import React from 'react'

export const useBool = (initialState: boolean): [boolean, () => void, () => void, () => void] => {
  const [state, setState] = React.useState(initialState)
  const turnOn = React.useCallback(() => setState(true), [])
  const turnOff = React.useCallback(() => setState(false), [])
  const toggle = React.useCallback(() => setState((state) => !state), [])
  return [state, turnOn, turnOff, toggle]
}
