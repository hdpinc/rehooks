## Usage

```tsx
import { useArray } from '@jmdc/rehooks'
import React from 'react'

const TestComponent = () => {
  const init = ['a', 'b', 'c', 1, 2, 3, undefined, null]
  const { state, toggle, reset, clear } = useArray([init])

  return (
    <div>
      <div>
        {init
          .filter((v) => state.includes(v))
          .map((value, index) => (
            <span
              key={index}
              onClick={() => {
                toggle(value)
              }}
            >
              {value}
            </span>
          ))}
      </div>
      <button onClick={reset}>reset</button>
      <button onClick={clear}>clear</button>
    </div>
  )
}
```
