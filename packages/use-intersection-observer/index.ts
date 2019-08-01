import { RefObject, useEffect, useState } from 'react'

type Options = {
  callback?: IntersectionObserverCallback
  root?: RefObject<Element | null>
  rootMargin?: string
  target: RefObject<Element>
  threshold?: number | number[]
}

const useIntersectionObserver = (options: Options) => {
  const { root, target, rootMargin, threshold, callback = () => {} } = options
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([])

  useEffect(() => {
    if (!target || !target.current) {
      console.warn('No target specified for Intersection Observer.')
      return
    }

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

    observer.observe(target.current as HTMLElement)

    return () => {
      observer.unobserve(target.current as HTMLElement)
    }
  }, [callback, root, rootMargin, target, threshold])

  return entries
}

export default useIntersectionObserver
