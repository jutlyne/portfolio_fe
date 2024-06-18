import type { UploadFile } from 'ant-design-vue'

export const maxImageUploadSize = 1024 * 1024 * 10 // 10MB

export const validateImage = (
  { type, size }: UploadFile,
  allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
) => {
  if (type && size) {
    return allowedTypes.includes(type) && size < maxImageUploadSize
  }

  return false
}
