import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { createEvent } from '../../testing/utils'
import { useClickAway } from './useClickAway'

const Comp: React.FC<{ handler: () => void }> = ({ handler }) => {
  const ref = React.useRef(null)

  useClickAway(ref, () => {
    handler()
  })

  return (
    <div>
      <div ref={ref}>
        <div data-testid={'inside'}>inside</div>
      </div>
      <div data-testid={'outside'}>outside</div>
    </div>
  )
}

const events: string[] = ['mousedown', 'touchstart']

events.forEach((eventName) => {
  it(`Handler should be called when ${eventName} is fired outside the target.`, () => {
    const handler = jest.fn()
    const { getByTestId } = render(<Comp handler={handler} />)
    const event = createEvent(eventName, { bubbles: true })
    fireEvent(getByTestId('outside'), event)
    expect(handler).toHaveBeenCalled()
  })
})

events.forEach((eventName) => {
  it(`Handler should not be called when ${eventName} is fired inside the target.`, () => {
    const handler = jest.fn()
    const { getByTestId } = render(<Comp handler={handler} />)
    const event = createEvent(eventName, { bubbles: true })
    fireEvent(getByTestId('inside'), event)
    expect(handler).not.toHaveBeenCalled()
  })
})
