// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** videoReset POST /api/video */
export async function videoResetUsingPost(
  body: API.VideoRequest,
  options?: { [key: string]: any }
) {
  return request<any>('/api/video', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
