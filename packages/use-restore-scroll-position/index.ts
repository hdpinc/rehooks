import { useEffect } from 'react'

export type RestoreScrollPositionOptions = {
  // scroll container
  target: React.RefObject<HTMLElement>

  // style で scroll-behavior: 'smooth' を指定していても復元時だけは 'auto' にしたい、みたいなケースのため
  scrollBehavior?: ScrollBehavior
}

const getItem = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) as string)
  } catch (e) {
    return null
  }
}

const setItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    //
  }
}

const useRestoreScrollPosition = (options: RestoreScrollPositionOptions) => {
  const { target, scrollBehavior: _scrollBehavior } = options

  useEffect(() => {
    const onUnload = () => {
      if (!target.current) {
        return
      }
      const previousScroll = target.current.scrollTop
      setItem('previousScroll', previousScroll)
    }

    const onLoad = () => {
      if (!target.current) {
        return
      }
      const previousScroll = (getItem('previousScroll') as number) || 0
      // element に直接指定された 'scroll-behavior' があれば保存しておく
      const previousScrollBehavior = target.current.style.scrollBehavior as ScrollBehavior
      const scrollBehavior: ScrollBehavior = _scrollBehavior || previousScrollBehavior || 'auto'

      // element の 'scroll-behavior' を上書きして scroll を実行
      target.current.style.setProperty('scroll-behavior', scrollBehavior, 'important')
      target.current.scrollTop = previousScroll

      // 復元する
      target.current.style.setProperty('scroll-behavior', previousScrollBehavior || '')
    }

    onLoad()

    window.addEventListener('unload', onUnload)

    return () => {
      window.removeEventListener('unload', onUnload)
    }
  }, [_scrollBehavior, target])
}

export default useRestoreScrollPosition
