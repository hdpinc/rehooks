# `use-restore-scroll-position`

Restore previous scroll position after reloading the page.

## Usage

```jsx
import React from 'react'
import useRestoreScrollPosition from '@jmdc-rehooks/use-restore-scroll-position

const Component = () => {
  const ref = React.useRef(null)
  useRestoreScrollPosition({ target: ref, scrollBehavior: 'auto' })

  return <div ref={ref}>Content</div>
}
```

## Options

### `target`

#### `RefObject<HTMLElement>`

`RefObject` of the target scroll container.

### `scrollBehavior`

#### `"smooth" | "auto"`

Scroll behavior.
