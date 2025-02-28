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

/** getCustomAudio POST /api/audioFile/get/customAudio */
export async function getCustomAudioUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseListAudioFileVO_>('/api/audioFile/get/customAudio', {
    method: 'POST',
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

/** uploadAudio POST /api/audioFile/upload */
export async function uploadAudioUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadAudioUsingPOSTParams,
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

  return request<API.BaseResponseString_>('/api/audioFile/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  })
}
