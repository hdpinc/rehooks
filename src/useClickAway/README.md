## Usage

```tsx
import { useClickAway } = '@jmdc/rehooks';
import React from 'react'

const TestComponent = () => {
  const ref = React.useRef(null)
  const [isOpen, setOpen] = React.useState(false)

  useClickAway(ref, () => {
    setOpen(false)
  })

  return (
    <div>
      <Modal ref={ref} isOpen={isOpen}>
        <div>Some content</div>
      </Modal>
      <button onClick={() => setOpen(true)}>Open</button>
    </div>
  )
}
```
