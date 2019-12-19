## Install

```shell
$ yarn add @jmdc/rehooks
```

## Usage


```tsx
import { useDate } = '@jmdc/rehooks';


const TestComponent = () => {
  const {
    date,
    dateStr,
    prevMonth,
    nextMonth,
  } = useDate(new Date(), { format: 'yyyy-MM-dd' })
  return (
    <div>
      <button onClick={prevMonth}>Prev month</button>
      <button onClick={nextMonth}>Next month</button>
      <div>{dateStr}</div>
    </div>
  )
}
```
