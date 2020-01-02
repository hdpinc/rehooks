import { mount } from 'enzyme'
import React from 'react'
import { createEvent } from '../testing/utils'
import useClickAway from './index'

const Comp: React.FC<{ handler: () => void }> = ({ handler }) => {
  const ref = React.useRef(null)

  useClickAway(ref, () => {
    handler()
  })

  return (
    <div>
      <div ref={ref}>
        <div id={'inside'}>inside</div>
      </div>
      <div id={'outside'}>outside</div>
    </div>
  )
}

const events: string[] = ['mousedown', 'touchstart']

let container: HTMLElement | null

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container as HTMLElement)
  container = null
})

events.forEach((eventName) => {
  it(`Handler should be called when ${eventName} is fired outside the target.`, () => {
    const handler = jest.fn()
    const wrapper = mount(<Comp handler={handler} />, { attachTo: container })
    const event = createEvent(eventName, { bubbles: true })
    const target = wrapper.find('#outside').getDOMNode()
    target.dispatchEvent(event)
    expect(handler).toHaveBeenCalled()
  })
})

events.forEach((eventName) => {
  it(`Handler should not be called when ${eventName} is fired inside the target.`, () => {
    const handler = jest.fn()
    const wrapper = mount(<Comp handler={handler} />, { attachTo: container })
    const event = createEvent(eventName, { bubbles: true })
    const target = wrapper.find('#inside').getDOMNode()
    target.dispatchEvent(event)
    expect(handler).not.toHaveBeenCalled()
  })
})
