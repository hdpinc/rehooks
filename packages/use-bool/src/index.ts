import { useState } from 'react'

const useBool = (initialState: boolean) => {
  const [state, setState] = useState(initialState)
  return [state, () => setState(true), () => setState(false)]
}

export default useBool
