## Usage

```tsx
import { useDatepicker } = '@jmdc/rehooks';

const Datepicker = (props) => {
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
  } = useDatepicker({})

  const ref = React.useRef(null)
  useClickAway(ref, () => {
    close()
  })

  return (
    <div ref={ref}>
      <input {...inputProps} readOnly={true} />
      {isOpen && (
        <div>
          {mode === 'year' && (
            <>
              <div style={{ display: 'flex' }}>
                <button onClick={() => uiDate.subYears(10)}>&laquo;</button>
                <div>
                  <button onClick={setDateMode}>{uiDate.format('yyyy年')}</button>
                  <button onClick={setMonthMode}>{uiDate.format('MM月')}</button>
                </div>
                <button onClick={() => uiDate.addYears(10)}>&raquo;</button>
              </div>
              <div>
                {years.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => {
                      uiDate.setYear(value)
                      setDateMode()
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}
          {mode === 'month' && (
            <>
              <div style={{ display: 'flex' }}>
                <button onClick={uiDate.subYear}>&laquo;</button>
                <div>
                  <button onClick={setYearMode}>{uiDate.format('yyyy年')}</button>
                  <button onClick={setDateMode}>{uiDate.format('MM月')}</button>
                </div>
                <button onClick={uiDate.addYear}>&raquo;</button>
              </div>
              <div>
                {months.map(({ label, month }) => (
                  <button
                    key={month}
                    onClick={() => {
                      uiDate.setMonth(month)
                      setDateMode()
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}
          {mode === 'date' && (
            <>
              <div style={{ display: 'flex' }}>
                <button onClick={uiDate.subYear}>&laquo;</button>
                <button onClick={uiDate.subMonth}>&lt;</button>
                <div>
                  <button onClick={setYearMode}>{uiDate.format('yyyy年')}</button>
                  <button onClick={setMonthMode}>{uiDate.format('MM月')}</button>
                </div>
                <button onClick={uiDate.addMonth}>&gt;</button>
                <button onClick={uiDate.addYear}>&raquo;</button>
              </div>
              <table>
                <thead>
                  <tr>
                    {headerRow.map(({ label, day }) => (
                      <th key={day}>{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((cols, index) => (
                    <tr key={index}>
                      {cols.map((col, index) => (
                        <td key={index}>
                          <button
                            onClick={() => {
                              setValue(col)
                              close()
                            }}
                          >
                            {col.getDate()}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  )
}

```
