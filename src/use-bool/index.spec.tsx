import { shallow } from 'enzyme'
import React from 'react'
import useBool from './index'

const TestComponent: React.FC<{ initialValue: boolean }> = (props) => {
  const { initialValue } = props
  const [state, turnOn, turnOff] = useBool(initialValue)
  return (
    <div>
      <span id={'state'}>{state ? 'on' : 'off'}</span>
      <button onClick={turnOn} id={'on'}>
        on
      </button>
      <button onClick={turnOff} id={'off'}>
        off
      </button>
    </div>
  )
}

it('turns on', () => {
  const wrapper = shallow(<TestComponent initialValue={false} />)
  wrapper.find('#on').simulate('click')
  expect(wrapper.find('#state').text()).toBe('on')
})

it('turns off', () => {
  const wrapper = shallow(<TestComponent initialValue={true} />)
  wrapper.find('#off').simulate('click')
  expect(wrapper.find('#state').text()).toBe('off')
})
