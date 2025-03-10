export function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  return Object.keys(obj)
    .filter(key => !keys.includes(key as K))
    .reduce(
      (acc, key) => {
        acc[key as keyof Omit<T, K>] = obj[key]
        return acc
      },
      {} as Omit<T, K>
    )
}
