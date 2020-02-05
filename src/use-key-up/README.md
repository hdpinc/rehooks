## Usage

```tsx
import { useKeyUp } from '@jmdc/rehooks'
import React from 'react'

const TestComponent = () => {
  const [isOpen, setOpen] = React.useState(false)
  useKeyUp('Esc', () => {
    setOpen(false)
  })

  return (
    <div>
      <Dialog open={isOpen} />
      <button onClick={() => setOpen(true)}>Push Me!</button>
    </div>
  )
}
```
