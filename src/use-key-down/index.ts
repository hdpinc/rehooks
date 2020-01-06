import React from 'react'

const useKeyDown = (key: string, onKeyDown?: () => void) => {
  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === key) {
        onKeyDown?.()
      }
    }

    window.addEventListener('keydown', listener)

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [key, onKeyDown])
}

export default useKeyDown
