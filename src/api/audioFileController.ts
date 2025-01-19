// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** addAudioFile POST /api/audioFile/add */
export async function addAudioFileUsingPost(
  body: API.AudioFileAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>('/api/audioFile/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** deleteAudioFile POST /api/audioFile/delete */
export async function deleteAudioFileUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/audioFile/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** getAudioFileVOById GET /api/audioFile/get/vo */
export async function getAudioFileVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAudioFileVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseAudioFileVO_>('/api/audioFile/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** listAudioFileByPage POST /api/audioFile/list/page */
export async function listAudioFileByPageUsingPost(
  body: API.AudioFileQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageAudioFile_>('/api/audioFile/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** listAudioFileVOByPage POST /api/audioFile/list/page/vo */
export async function listAudioFileVoByPageUsingPost(
  body: API.AudioFileQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageAudioFileVO_>('/api/audioFile/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** listMyAudioFileVOByPage POST /api/audioFile/my/list/page/vo */
export async function listMyAudioFileVoByPageUsingPost(
  body: API.AudioFileQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageAudioFileVO_>('/api/audioFile/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** updateAudioFile POST /api/audioFile/update */
export async function updateAudioFileUsingPost(
  body: API.AudioFileUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/audioFile/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
