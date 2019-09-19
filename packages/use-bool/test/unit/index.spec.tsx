import { shallow } from 'enzyme'
import React from 'react'
import useBool from '../../index'

const TestComponent: React.FC<{ initialValue: boolean }> = (props) => {
  const { initialValue } = props
  const [state, turnOn, turnOff] = useBool(initialValue)
  return (
    <div>
      <span id={'state'}>{state ? 'on' : 'off'}</span>
      <button onClick={turnOn} id={'on'}></button>
      <button onClick={turnOff} id={'off'}></button>
    </div>
  )
}

it('renders without an error', () => {
  const wrapper = shallow(<TestComponent initialValue={false} />)
  expect(wrapper.find('#state').props().children).toBe('off')
})

it('turns on', () => {
  const wrapper = shallow(<TestComponent initialValue={false} />)
  // @ts-ignore
  // prettier-ignore
  wrapper.find('#on').props().onClick()
  expect(wrapper.find('#state').props().children).toBe('on')
})

it('turns off', () => {
  const wrapper = shallow(<TestComponent initialValue={true} />)
  // @ts-ignore
  // prettier-ignore
  wrapper.find('#off').props().onClick()
  expect(wrapper.find('#state').props().children).toBe('off')
})
