## Install

```shell
$ yarn add @jmdc-rehooks/use-bool
```

## Usage

```tsx
import useBool = 'use-bool';

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
