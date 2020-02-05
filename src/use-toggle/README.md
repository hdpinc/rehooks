## Usage

```tsx
import { useToggle } from '@jmdc/rehooks'
import React from 'react'

const TestComponent = () => {
  const [state, toggle, set] = useToggle(false)

  return (
    <div>
      <span>{state ? 'on' : 'off'}</span>
      <button onClick={toggle}>toggle</button>
      <button onClick={() => set(true)}>on</button>
      <button onClick={() => set(false)}>off</button>
    </div>
  )
}
```
