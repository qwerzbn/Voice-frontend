<template>
  <div id="text-to-audio">
    <a-textarea
      class="synthesis-text"
      v-model:value="textValue"
      placeholder="请输入合成文本"
      :rows="6"
    />
    <a-space direction="horizontal">
      <a-upload-dragger
        :disabled="isUploaded"
        class="upload-audio"
        v-model:fileList="fileList"
        :name="fileName"
        :multiple="false"
        :progress="progressConfig"
        :customRequest="handleUpload"
        @change="handleChange"
        @drop="handleDrop"
        maxCount="3"
        accept=".wav,.mp3,.flac"
      >
        <!--        关闭按钮      -->
        <div style="position: absolute; top: 10px; right: 10px">
          <a-button plain shape="circle" :icon="h(CloseOutlined)" @click="closeUploading" />
        </div>
        <div v-if="!isUploaded">
          <p class="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p class="ant-upload-text">将音频拖到此处</p>
          <p class="ant-upload-hint">-或-</p>
          <p class="ant-upload-text">点击上传</p>
        </div>
        <div v-else class="audio-player">
          <audio
            v-if="uploadAudioUrl"
            :src="uploadAudioUrl"
            controls
            style="width: 30vw; margin-top: 7vh"
          ></audio>
        </div>
      </a-upload-dragger>
      <a-card
        style="
          width: 35vw;
          height: 28vh;
          margin-left: 30px;
          margin-top: 12px;
          background: rgba(232, 228, 228, 0.33);
        "
      >
        <!-- 关闭按钮 -->
        <div style="position: absolute; top: 10px; right: 10px">
          <a-button plain shape="circle" :icon="h(CloseOutlined)" @click="closeRecording" />
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
          "
        >
          <audio
            v-if="recordAudioUrl"
            :src="recordAudioUrl"
            controls
            style="width: 30vw; margin-top: 7vh"
          ></audio>
        </div>
        <!-- 录音控制 -->
        <div style="position: absolute; bottom: 20px; left: 30px">
          <a-space v-if="!isRecording">
            <a-button
              type="primary"
              shape="circle"
              :icon="h(AudioOutlined)"
              @click="startRecording"
            />
            <a-typography-text>开始录音</a-typography-text>
          </a-space>
          <a-space v-if="isRecording">
            <a-button :icon="h(BorderOutlined)" type="primary" danger @click="stopRecording" />
            <a-typography-text>停止录音</a-typography-text>
          </a-space>
        </div>
      </a-card>
    </a-space>
    <p></p>
    <button class="generate-audio-button" @click="generate">生成音频</button>
    <p></p>
    <a-card class="generated-audio">
      <a-typography-text style="margin-right: 5px">合成音频</a-typography-text>
      <i class="fas fa-music"></i>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { AudioOutlined, BorderOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons-vue'
import { h, ref, watch } from 'vue'
import { uploadFileUsingPost } from '@/api/fileController.ts'
import { Client } from '@gradio/client'

// 是否正在录制语音
const isRecording = ref(false)
// 使用联合类型，进行媒体录制操作
const mediaRecorder = ref<MediaRecorder | null>(null)
const audioChunks = ref<Blob[]>([])
// 录音的 URL
const recordAudioUrl = ref('')
// 上传的 URL
const uploadAudioUrl = ref('')
// 是否已经上传文件
const isUploaded = ref(false)
// 是否正在上传文件
const loading = ref<boolean>(false)
// 在组件的数据部分定义 progress 和 loading 状态
const progress = ref<number>(0)
// 上传文件列表
const fileList = ref([])
//上传文件的名字
const fileName = ref('')
// 合成文本输入框的值
const textValue = ref('')
/**
 * 监听上传文件的状态
 * @param info
 */
const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status
  if (status !== 'uploading') {
  }
  if (status === 'done') {
    fileName.value = info.file.name
    message.success('文件上传成功')
  } else if (status === 'error') {
    message.error('文件上传失败')
  }
}
/**
 * 进度条配置
 */
const progressConfig: UploadProps['progress'] = {
  strokeColor: {
    '0%': '#108ee9',
    '100%': '#87d068',
  },
  strokeWidth: 3,
  // @ts-ignore
  format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
}
/**
 * 使用 watch 来监听 progressPercent 的变化并更新 progressConfig.percent
 */
watch(progress, (newPercent) => {
  if ('percent' in progressConfig) {
    progressConfig.percent = newPercent
  }
})

/**
 * 监听拖拽事件
 * @param e
 */
function handleDrop(e: DragEvent) {
  console.log(e)
}

/**
 * 上传文件
 * @param file
 * @param onProgress
 * @param onError
 * @param onSuccess
 */
const handleUpload = async ({ file, onProgress, onError, onSuccess }: any) => {
  loading.value = true
  progress.value = 0
  try {
    const params = { biz: 'audio_file' }
    // 上传文件
    const res = await uploadFileUsingPost(params, {}, file, {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        // 计算上传进度
        if (progressEvent.lengthComputable) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          progress.value = percentCompleted
          console.log(percentCompleted)
          onProgress({ percent: percentCompleted })
        }
      },
    })
    // 如果请求成功
    // @ts-ignore
    if (res.data.code === 0) {
      // @ts-ignore
      uploadAudioUrl.value = res.data.data
      isUploaded.value = true
      // 调用 onSuccess 来通知 Ant Design 上传已完成
      onSuccess(res.data)
    } else {
      // @ts-ignore
      message.error('文件上传失败，' + res.data.message)
      onError(new Error('上传失败'))
    }
  } catch (error) {
    message.error('文件上传失败')
    onError(error)
  } finally {
    loading.value = false
  }
}
/**
 * 开始录音
 */
const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder.value = new MediaRecorder(stream)
    mediaRecorder.value.ondataavailable = (event) => {
      audioChunks.value.push(event.data)
    }
    mediaRecorder.value.onstop = () => {
      const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' })
      recordAudioUrl.value = URL.createObjectURL(audioBlob)
      audioChunks.value = []
    }
    mediaRecorder.value.start()
    isRecording.value = true
  } catch (error) {
    message.error('无法访问麦克风')
  }
}
/**
 * 停止录音
 */
const stopRecording = () => {
  if (mediaRecorder.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
  }
}
/**
 * 关闭录音文件
 */
const closeRecording = () => {
  recordAudioUrl.value = ''
  isRecording.value = false
  fileList.value = []
  message.info('录音已清除')
}
/**
 * 关闭上传文件
 */
const closeUploading = () => {
  uploadAudioUrl.value = ''
  isUploaded.value = false
  fileList.value = []
  fileName.value = ''
  message.info('上传文件已清除')
}
/**
 * 生成音频
 */
const generate = async () => {
  if (!uploadAudioUrl.value && !recordAudioUrl.value) {
    message.error('请先上传音频文件或录制音频')
    return
  }
  const response = await fetch(uploadAudioUrl.value)
  const audioBlob = await response.blob()
  const client = await Client.connect('https://iic-cosyvoice2-0-5b.ms.show/')
  const result = await client.predict('/generate_audio', {
    mode_checkbox_group: '3s极速复刻',
    prompt_wav_upload: audioBlob,
    prompt_wav_record: audioBlob,
    stream: 'false',
  })
  console.log(result)
}

// 把选择的文件读取成为BASE64
const changeBASE64 = (file: File) => {
  return new Promise((resolve) => {
    let fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = (ev) => {
      resolve(ev.target?.result)
    }
  })
}

//base64转blob对象，创建blob url
const dataURLtoBlob = (dataurl: any) => {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime,
  })
}
</script>
<style scoped>
.synthesis-text {
  width: 80vw;
  margin-left: 7vw;
}

.generate-audio-button {
  background-color: rgba(94, 97, 100, 0.45);
  width: 80vw;
  margin-left: 7vw;
  margin-top: 28px;
  height: 40px;
  border-radius: 6px;
  padding: 8px calc(2 * 8px);
  font-weight: 600;
  font-size: 16px;
  transition: background-color 0.3s ease; /* 添加过渡效果 */
}

.generate-audio-button:hover {
  background-color: rgba(94, 97, 100, 0.7); /* 悬停时的颜色 */
}

.generated-audio {
  width: 80vw;
  margin-left: 7vw;
  margin-top: 28px;
  height: 120px;
  border-radius: 6px;
}

.fas fa-music {
  margin-left: 5px;
}
</style>
