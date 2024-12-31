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
  anchors: any[],
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
