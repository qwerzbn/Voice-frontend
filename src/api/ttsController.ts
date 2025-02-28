// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** tts POST /api/tts */
export async function ttsUsingPost(body: API.TTSRequest, options?: { [key: string]: any }) {
  return request<string>('/api/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
