import React from 'react'

export const useKeyUp = (key: string, onKeyUp?: () => void) => {
  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === key) {
        onKeyUp?.()
      }
    }

    window.addEventListener('keyup', listener)

    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [key, onKeyUp])
}
