// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** convertPPT POST /api/ppt/convert */
export async function convertPptUsingPost(
  body: API.PPTConvertRequest,
  options?: { [key: string]: any }
) {
  return request<API.ConversionResponse>('/api/ppt/convert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** generatePreview POST /api/ppt/preview */
export async function generatePreviewUsingPost(
  body: {},
  file?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData()

  if (file) {
    formData.append('file', file)
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele]

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''))
        } else {
          formData.append(ele, JSON.stringify(item))
        }
      } else {
        formData.append(ele, item)
      }
    }
  })

  return request<API.PreviewResponse>('/api/ppt/preview', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  })
}
