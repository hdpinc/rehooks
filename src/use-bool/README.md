## Install

```shell
$ yarn add @jmdc/rehooks
```

## Usage

```tsx
import { useBool } = '@jmdc/rehooks';

const TestComponent = () => {
  const [state, turnOn, turnOff] = useBool(false)
  return (
    <div>
      <span>{state ? 'on' : 'off'}</span>
      <button onClick={turnOn}></button>
      <button onClick={turnOff}></button>
    </div>
  )
}
```
