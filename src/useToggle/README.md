## Usage

```tsx
import { useToggle } from '@jmdc/rehooks'
import React from 'react'

const TestComponent = () => {
  const [state, toggle] = useToggle(false)

  return (
    <div>
      <span>{state ? 'on' : 'off'}</span>
      <button onClick={toggle}>toggle</button>
      <button onClick={() => toggle(true)}>on</button>
      <button onClick={() => toggle(false)}>off</button>
    </div>
  )
}
```
