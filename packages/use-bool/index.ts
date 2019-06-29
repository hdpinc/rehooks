import { useCallback, useState } from 'react'

const useBool = (initialState: boolean): [boolean, () => void, () => void] => {
  const [state, setState] = useState(initialState)
  const turnOn = useCallback(() => setState(true), [])
  const turnOff = useCallback(() => setState(false), [])
  return [state, turnOn, turnOff]
}

export default useBool
