import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import useClickAway from './index'

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

const events = ['mouseDown', 'touchStart'] as const

events.forEach((eventName) => {
  it(`Handler should be called when ${eventName} is fired outside the target.`, () => {
    const handler = jest.fn()
    const { getByTestId } = render(<Comp handler={handler} />)
    fireEvent[eventName](getByTestId('outside'))
    expect(handler).toHaveBeenCalled()
  })
})

events.forEach((eventName) => {
  it(`Handler should not be called when ${eventName} is fired inside the target.`, () => {
    const handler = jest.fn()
    const { getByTestId } = render(<Comp handler={handler} />)
    fireEvent[eventName](getByTestId('inside'))
    expect(handler).not.toHaveBeenCalled()
  })
})
