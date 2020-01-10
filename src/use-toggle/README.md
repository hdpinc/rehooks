## Install

```shell
$ yarn add @jmdc/rehooks
```

## Usage

```tsx
import { useToggle } = '@jmdc/rehooks';

const TestComponent = () => {
  const [state, toggle] = useBool(false)
  return (
    <div>
      <span>{state ? 'on' : 'off'}</span>
      <button onClick={toggle}></button>
    </div>
  )
}
```
