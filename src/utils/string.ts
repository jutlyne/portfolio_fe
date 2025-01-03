import type { BlogAnchorInterface } from '@/interfaces/BlogInterface'

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

export const removeVietnameseTones = (str: string) => {
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D')
  return str
}

export const generateIdFromText = (text: string) => {
  return removeVietnameseTones(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export const remapAnchorIds = (
  anchors: BlogAnchorInterface[],
  parentId: number | null = null,
  idCounter: number = 1
) => {
  let maxCounter = idCounter

  const remappedAnchor = anchors.map((anchor) => {
    const remappedAnchor = { ...anchor, id: idCounter, parent_id: parentId }

    idCounter++

    if (remappedAnchor.children) {
      const childResult = remapAnchorIds(remappedAnchor.children, remappedAnchor.id, idCounter)

      remappedAnchor.children = childResult.remappedAnchor
      idCounter = childResult.maxCounter
    }

    maxCounter = Math.max(maxCounter, idCounter)

    return remappedAnchor
  })

  return {
    remappedAnchor,
    maxCounter
  }
}

export const prepareFormDataWithSanitizedAnchors = (formState: any): FormData => {
  const formData = new FormData()
  const removeIdFromAnchors = (anchors: any[]) => {
    return anchors.map(({ id: _, ...rest }) => {
      if (rest.children) {
        rest.children = removeIdFromAnchors(rest.children)
      }
      return rest
    })
  }

  const sanitizedAnchors = removeIdFromAnchors(formState.anchors)

  for (const key in formState) {
    console.log(formState[key])

    if (key === 'anchors') {
      sanitizedAnchors.forEach((anchor: any, index: number) => {
        Object.entries(flattenObject(`anchors[${index}]`, anchor)).forEach(([nestedKey, value]) => {
          formData.append(nestedKey, value as string)
        })
      })
    } else if (key === 'image' && formState[key]) {
      formData.append(key, formState[key])
    } else if (Array.isArray(formState[key])) {
      formState[key].forEach((value: any) => formData.append(`${key}[]`, value))
    } else {
      formData.append(key, String(formState[key]))
    }
  }

  console.log(formData)

  return formData
}

function flattenObject(prefix: string, obj: any): Record<string, string> {
  let result: Record<string, string> = {}
  for (const key in obj) {
    const newKey = `${prefix}[${key}]`
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result = { ...result, ...flattenObject(newKey, obj[key]) }
    } else {
      result[newKey] = obj[key]
    }
  }
  return result
}
