## Usage

```tsx
import { useBool } from '@jmdc/rehooks'
import React from 'react'

const TestComponent = () => {
  const [state, turnOn, turnOff] = useBool(false)
  return (
    <div>
      <span>{state ? 'on' : 'off'}</span>
      <button onClick={turnOn}></button>
      <button onClick={turnOff}></button>
    </div>
  )
}
```
