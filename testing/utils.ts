/**
 * IE doesn't support Event constructor syntax, so we need an abstraction like this for testing across environments.
 *
 * NOTE: This helper doesn't support CustomEvent.
 */
export const createEvent = (
  eventName: string,
  options: {
    bubbles?: boolean
    cancelable?: boolean
    composed?: boolean
  } = {},
  eventType = 'Event'
) => {
  const { bubbles = false, cancelable = false, composed = false } = options

  if (typeof Event === 'function') {
    const EventConstructor = window[
      typeof window[eventType as any] === 'function' ? eventType : ('Event' as any)
    ] as any
    return new EventConstructor(eventName, { bubbles, cancelable, composed })
  } else {
    // IE
    const event = document.createEvent('Event')
    event.initEvent(eventName, bubbles, cancelable)
    return event
  }
}
