## Usage

```tsx
import { useLocalStorage } from '@jmdc/rehooks'
import React from 'react'

const TestComponent = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)
  return (
    <div style={{ background: darkMode ? 'black' : 'white' }}>
      <span style={{ color: darkMode ? 'white' : 'black' }}>Text</span>
      <input type={'checkbox'} onChange={(e) => setDarkMode(e.target.checked)} checked={darkMode} />
    </div>
  )
}
```
