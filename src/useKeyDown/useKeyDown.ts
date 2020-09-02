import React from 'react'

export const useKeyDown = (key: string, onKeyDown?: () => void) => {
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
