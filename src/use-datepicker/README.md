## Usage

```tsx
import { useDatepicker } = '@jmdc/rehooks';

const Datepicker: React.FC<DatepickerProps> = (props) => {
  const { min, max, initialValue } = props
  const {
    years,
    months,
    rows,
    headerRow,
    uiDate,
    mode,
    setYearMode,
    setMonthMode,
    setDateMode,
    inputProps,
    setValue,
    isOpen,
    close,
    open,
  } = useDatepicker({
    initialValue,
    min,
    max,
  })

  const ref = React.useRef(null)
  useClickAway(ref, () => {
    close()
  })

  return (
    <Wrapper ref={ref}>
      <input {...inputProps} style={{ width: '100%' }} />
      {isOpen && (
        <PopUp>
          <Calendar>
            {mode === 'year' && (
              <>
                <CalendarHeader>
                  <CalendarHeaderControlLink style={{ float: 'left' }} onClick={() => uiDate.subYears(10)}>
                    «
                  </CalendarHeaderControlLink>
                  <CalendarHeaderYearMonthLink onClick={setDateMode}>
                    {uiDate.format('yyyy年')}
                  </CalendarHeaderYearMonthLink>
                  <CalendarHeaderYearMonthLink onClick={setMonthMode}>
                    {uiDate.format('MM月')}
                  </CalendarHeaderYearMonthLink>
                  <CalendarHeaderControlLink style={{ float: 'right' }} onClick={() => uiDate.addYears(10)}>
                    »
                  </CalendarHeaderControlLink>
                </CalendarHeader>
                <CalendarYear>
                  {years.map(({ label, value }) => (
                    <CalendarYearLink
                      key={value}
                      isSelected={uiDate.year === value}
                      onClick={() => {
                        uiDate.setYear(value)
                        setDateMode()
                      }}
                    >
                      {label}
                    </CalendarYearLink>
                  ))}
                </CalendarYear>
              </>
            )}
            {mode === 'month' && (
              <>
                <CalendarHeader>
                  <CalendarHeaderControlLink style={{ float: 'left' }} onClick={uiDate.subYear}>
                    «
                  </CalendarHeaderControlLink>
                  <CalendarHeaderYearMonthLink onClick={setYearMode}>
                    {uiDate.format('yyyy年')}
                  </CalendarHeaderYearMonthLink>
                  <CalendarHeaderYearMonthLink onClick={setDateMode}>
                    {uiDate.format('MM月')}
                  </CalendarHeaderYearMonthLink>
                  <CalendarHeaderControlLink style={{ float: 'right' }} onClick={uiDate.addYear}>
                    »
                  </CalendarHeaderControlLink>
                </CalendarHeader>
                <CalendarMonth>
                  {months.map(({ label, value }) => (
                    <CalendarMonthLink
                      key={value}
                      isSelected={uiDate.month === value}
                      onClick={() => {
                        uiDate.setMonth(value)
                        setDateMode()
                      }}
                    >
                      {label}
                    </CalendarMonthLink>
                  ))}
                </CalendarMonth>
              </>
            )}
            {mode === 'date' && (
              <>
                <CalendarHeader>
                  <CalendarHeaderControlLink style={{ float: 'left' }} onClick={uiDate.subYear}>
                    «
                  </CalendarHeaderControlLink>
                  <CalendarHeaderControlLink style={{ float: 'left' }} onClick={uiDate.subMonth}>
                    ‹
                  </CalendarHeaderControlLink>
                  <CalendarHeaderYearMonthLink onClick={setYearMode}>
                    {uiDate.format('yyyy年')}
                  </CalendarHeaderYearMonthLink>
                  <CalendarHeaderYearMonthLink onClick={setMonthMode}>
                    {uiDate.format('MM月')}
                  </CalendarHeaderYearMonthLink>
                  <CalendarHeaderControlLink style={{ float: 'right' }} onClick={uiDate.addYear}>
                    »
                  </CalendarHeaderControlLink>
                  <CalendarHeaderControlLink style={{ float: 'right' }} onClick={uiDate.addMonth}>
                    ›
                  </CalendarHeaderControlLink>
                </CalendarHeader>
                <CalendarTable>
                  <thead>
                    <tr>
                      {headerRow.map(({ label, value }) => (
                        <CalendarTh key={value}>{label}</CalendarTh>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((cols, index) => (
                      <tr key={index}>
                        {cols.map((col, index) => (
                          <CalendarTd
                            key={index}
                            isWithinInterval={col.isWithinInterval}
                            isSelected={col.isSelected}
                            isCurrentMonth={col.isCurrentMonth}
                            onClick={() => {
                              if (!col.isWithinInterval) {
                                return
                              }
                              setValue(col.date)
                              close()
                            }}
                          >
                            {col.date.getDate()}
                          </CalendarTd>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </CalendarTable>
              </>
            )}
          </Calendar>
        </PopUp>
      )}
    </Wrapper>
  )
}
```
