import React from 'react'

const useBool = (initialState: boolean): [boolean, () => void, () => void] => {
  const [state, setState] = React.useState(initialState)
  const turnOn = () => setState(true)
  const turnOff = () => setState(false)
  return [state, turnOn, turnOff]
}

export default useBool
