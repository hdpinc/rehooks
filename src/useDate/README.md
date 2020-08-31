## Usage

```tsx
import { useDate } = '@jmdc/rehooks';


const TestComponent = () => {
  const date = useDate(new Date())
  return (
    <div>
      <button onClick={date.prevMonth}>Prev month</button>
      <button onClick={date.nextMonth}>Next month</button>
      <div>{date.format('yyyy-MM')}</div>
    </div>
  )
}
```
