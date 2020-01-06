## Usage

```tsx
import { useKeyDown } = '@jmdc/rehooks';
import React from 'react'

const TestComponent = () => {
  const [isOpen, setOpen] = React.useState(false)
  useKeyDown('Esc', () => {
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
