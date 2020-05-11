const map = new Map()

export default {
  setItem: (key: string, value: any) => {
    map.set(key, value)
  },
  getItem: (key: string) => {
    return map.get(key)
  },
}
