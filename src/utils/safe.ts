const safe = async (promise: Promise<void>, muteError = false) => {
  try {
    const result = await promise

    return [result, null]
  } catch (error) {
    if (!muteError) {
      console.trace('Error Safe')
      console.error(error)
    }

    return [null, error]
  }
}

const safeRead = async (
  promise: Promise<void>,
  defaultValue = null,
  errorCallback: ((error: any) => void) | null = null,
  muteError = false
) => {
  const [result, errorResult] = await safe(promise, muteError)
  if (result !== null) {
    return (result as any).data
  }

  if (typeof errorCallback == 'function') {
    errorCallback?.(errorResult)
  }

  return defaultValue
}

export { safe, safeRead }
