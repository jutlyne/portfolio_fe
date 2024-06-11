export const camelCaseToTitleCase = (camelCase: string): string => {
  const result = camelCase.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export const getEnumKeyByValue = (value: number, object = {}): string | undefined => {
  const keys = Object.keys(object).filter((key) => isNaN(Number(key)))
  for (const key of keys) {
    if (object[key as keyof typeof object] === value) {
      return key
    }
  }
  return undefined
}
