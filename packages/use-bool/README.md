## Install

```shell
$ yarn add @jmdc-rehooks/use-bool
```

## Usage

```tsx
import useBool = 'use-bool';

const MyComponent = () => {
  const [isOpen, open, close] = useBool(false)

  return (
    <div>
      ...
    </div>
  )
}
```
