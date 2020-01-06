import React from 'react'

const useKeyUp = (key: string, onKeyUp?: () => void) => {
  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === key) {
        onKeyUp?.()
      }
    }

    window.addEventListener('keydown', listener)

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [key, onKeyUp])
}

export default useKeyUp
