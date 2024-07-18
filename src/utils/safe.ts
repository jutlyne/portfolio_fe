export interface SafeInterface<T> {
  result: any
  errorResult: any | null
}

const safe = async <T>(promise: Promise<T>, muteError = false): Promise<SafeInterface<T>> => {
  try {
    const result = ((await promise) as any)?.data

    return { result, errorResult: null }
  } catch (error) {
    if (!muteError) {
      console.trace('Error Safe')
      console.error(error)
    }

    return { result: null, errorResult: error }
  }
}

const safeRead = async <T>(
  promise: Promise<T>,
  defaultValue: any = {},
  errorCallback: ((error: any) => void) | null = null,
  muteError = false
): Promise<any> => {
  const { result, errorResult } = await safe(promise, muteError)
  if (result !== null && typeof result.data !== 'undefined') {
    return result.data
  }

  if (typeof errorCallback === 'function') {
    errorCallback?.(errorResult)
  }

  return defaultValue
}

export { safe, safeRead }
