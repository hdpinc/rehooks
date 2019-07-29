import { shallow } from 'enzyme'
import React, { useRef } from 'react'
import useRestoreScrollPosition from '.'

const TestComponent: React.FC = () => {
  const ref = useRef()
  useRestoreScrollPosition({ target: ref })

  return (
    <div>
      <div id={'container'} ref={ref}>
        <div>Content</div>
      </div>
    </div>
  )
}

const setUp = () => {
  const comp = shallow(<TestComponent />)
  return {
    comp,
  }
}

it('renders without an error', () => {
  const { comp } = setUp()
  expect(comp.find('#container').exists()).toBe(true)
})

it('renders without an error', () => {
  const { comp } = setUp()
  expect(comp.find('#container').exists()).toBe(true)
})
