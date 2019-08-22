import { RefObject, useEffect, useState } from 'react'

export type IntersectionObserverOptions = {
  callback?: IntersectionObserverCallback
  root?: RefObject<Element | null>
  rootMargin?: string
  target: RefObject<Element>
  threshold?: number | number[]
}

const useIntersectionObserver = (options: IntersectionObserverOptions) => {
  const { root, target, rootMargin, threshold, callback = () => {} } = options
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([])

  useEffect(() => {
    const current = target.current
    if (!current) {
      console.warn('No target specified for Intersection Observer.')
      return
    }

    // IntersectionObserver 未実装のブラウザのフォールバックに対応しているため eslint の警告は無視する
    // eslint-disable-next-line compat/compat
    const observer = new IntersectionObserver(
      (entries) => {
        setEntries(entries)
        callback(entries, observer)
      },
      {
        root: !root ? null : root.current,
        rootMargin,
        threshold,
      }
    )

    observer.observe(current)

    return () => {
      observer.unobserve(current)
    }
  }, [callback, root, rootMargin, target, threshold])

  return entries
}

export default useIntersectionObserver
