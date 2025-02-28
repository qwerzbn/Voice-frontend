<template>
  <!--  声音样本库-->
  <div id="audio-library">
    <div style="text-align: center">
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="预设声音">
          <a-typography-text class="Title1">普通话</a-typography-text>
          <a-divider />
          <a-list
            :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
            :data-source="mandarin"
            :loading="loading"
          >
            <template #renderItem="{ item: audio, index }">
              <a-list-item style="padding: 18px">
                <!-- 单张图片 -->
                <a-card hoverable class="homeCard">
                  <template #cover>
                    <img
                      style="height: 180px; border-radius: 20px; object-fit: cover"
                      :alt="audio.picture"
                      :src="audio.picture"
                    />
                  </template>
                  <a-card-meta style="padding: -12px">
                    <template #description>
                          <!-- 播放图标 -->
                          <!--                          <div @click="togglePlay(index)">-->
                          <!--                            <span v-if="!isPlaying[index]"-->
                          <!--                              ><PlayCircleOutlined style="font-size: 40px"-->
                          <!--                            /></span>-->
                          <!--                            &lt;!&ndash; 播放图标 &ndash;&gt;-->
                          <!--                            <span v-else><PauseCircleOutlined style="font-size: 40px" /></span>-->
                          <!--                            &lt;!&ndash; 暂停图标 &ndash;&gt;-->
                          <!--                          </div>-->
                          <!--                          <audio-->
                          <!--                            ref="audioPlayer"-->
                          <!--                            :src="audio.filePath"-->
                          <!--                            @ended="onAudioEnded(index)"-->
                          <!--                          ></audio>-->
                          <audio
                            style="width: 100%;height: 40px"
                            :src="audio.filePath"
                            controls
                          ></audio>
                          <a-flex style="align-items: center; margin-left: 12px; margin-top: 12px">
                            <div v-for="tag in audio.tags">
                              <a-tag
                                v-if="tag === '中文'"
                                color="blue"
                                style="align-items: center"
                                :key="tag"
                              >
                                {{ tag }}
                              </a-tag>
                              <a-tag
                                v-if="tag === '女声'"
                                color="green"
                                style="align-items: center"
                                :key="tag"
                              >
                                {{ tag }}
                              </a-tag>
                              <a-tag
                                v-if="tag === '舒缓'"
                                color="orange"
                                style="align-items: center"
                                :key="tag"
                              >
                                {{ tag }}
                              </a-tag>
                              <a-tag
                                v-if="tag === '康辉'"
                                color="red"
                                style="align-items: center"
                                :key="tag"
                              >
                                {{ tag }}
                              </a-tag>
                              <a-tag
                                v-if="tag === '欧丽娟'"
                                color="cyan"
                                style="align-items: center"
                                :key="tag"
                              >
                                {{ tag }}
                              </a-tag>
                            </div>
                          </a-flex>
                    </template>
                  </a-card-meta>
                </a-card>
              </a-list-item>
            </template>
          </a-list>

          <a-typography-text class="Title2">英语</a-typography-text>
          <a-divider />
          <a-list
            :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
            :data-source="English"
            :loading="loading"
          >
            <template #renderItem="{ item: audio, index }">
              <a-list-item style="padding: 18px">
                <!-- 单张图片 -->
                <a-card hoverable class="homeCard">
                  <template #cover>
                    <img
                      style="height: 180px; border-radius: 20px; object-fit: cover"
                      :alt="audio.picture"
                      :src="audio.picture"
                    />
                  </template>
                  <a-card-meta style="padding: -12px">
                    <template #description>
                      <!-- 播放图标 -->
                      <!--                          <div @click="togglePlay(index)">-->
                      <!--                            <span v-if="!isPlaying[index]"-->
                      <!--                              ><PlayCircleOutlined style="font-size: 40px"-->
                      <!--                            /></span>-->
                      <!--                            &lt;!&ndash; 播放图标 &ndash;&gt;-->
                      <!--                            <span v-else><PauseCircleOutlined style="font-size: 40px" /></span>-->
                      <!--                            &lt;!&ndash; 暂停图标 &ndash;&gt;-->
                      <!--                          </div>-->
                      <!--                          <audio-->
                      <!--                            ref="audioPlayer"-->
                      <!--                            :src="audio.filePath"-->
                      <!--                            @ended="onAudioEnded(index)"-->
                      <!--                          ></audio>-->
                      <audio
                        style="width: 100%;height: 40px"
                        :src="audio.filePath"
                        controls
                      ></audio>
                      <a-flex style="align-items: center; margin-left: 12px; margin-top: 12px">
                        <div v-for="tag in audio.tags">
                          <a-tag
                            v-if="tag === '中文'"
                            color="blue"
                            style="align-items: center"
                            :key="tag"
                          >
                            {{ tag }}
                          </a-tag>
                          <a-tag
                            v-if="tag === '女声'"
                            color="green"
                            style="align-items: center"
                            :key="tag"
                          >
                            {{ tag }}
                          </a-tag>
                          <a-tag
                            v-if="tag === '舒缓'"
                            color="orange"
                            style="align-items: center"
                            :key="tag"
                          >
                            {{ tag }}
                          </a-tag>
                          <a-tag
                            v-if="tag === '康辉'"
                            color="red"
                            style="align-items: center"
                            :key="tag"
                          >
                            {{ tag }}
                          </a-tag>
                          <a-tag
                            v-if="tag === '欧丽娟'"
                            color="cyan"
                            style="align-items: center"
                            :key="tag"
                          >
                            {{ tag }}
                          </a-tag>
                        </div>
                      </a-flex>
                    </template>
                  </a-card-meta>
                </a-card>
              </a-list-item>
            </template>
          </a-list>

          <a-typography-text class="Title3">方言</a-typography-text>
          <a-divider />
          <a-list
            :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
            :data-source="dialect"
            :loading="loading"
          >
            <template #renderItem="{ item: audio, index }">
              <a-list-item style="padding: 18px">
                <!-- 单张图片 -->
                <a-card hoverable class="homeCard">
                  <template #cover>
                    <img
                      style="height: 180px; border-radius: 20px; object-fit: cover"
                      :alt="audio.picture"
                      :src="audio.picture"
                    />
                  </template>
                  <a-card-meta style="padding: -12px">
                    <template #description>
                      <!-- 播放图标 -->
                      <!--                          <div @click="togglePlay(index)">-->
                      <!--                            <span v-if="!isPlaying[index]"-->
                      <!--                              ><PlayCircleOutlined style="font-size: 40px"-->
                      <!--                            /></span>-->
                      <!--                            &lt;!&ndash; 播放图标 &ndash;&gt;-->
                      <!--                            <span v-else><PauseCircleOutlined style="font-size: 40px" /></span>-->
                      <!--                            &lt;!&ndash; 暂停图标 &ndash;&gt;-->
                      <!--                          </div>-->
                      <!--                          <audio-->
                      <!--                            ref="audioPlayer"-->
                      <!--                            :src="audio.filePath"-->
                      <!--                            @ended="onAudioEnded(index)"-->
                      <!--                          ></audio>-->
                      <audio
                        style="width: 100%;height: 40px"
                        :src="audio.filePath"
                        controls
                      ></audio>
                      <a-flex style="align-items: center; margin-left: 12px; margin-top: 12px">
                        <div v-for="tag in audio.tags">
                          <a-tag
                            v-if="tag === '中文'"
                            color="blue"
                            style="align-items: center"
                            :key="tag"
                          >
                            {{ tag }}
                          </a-tag>
                          <a-tag
                            v-if="tag === '女声'"
                            color="green"
                            style="align-items: center"
                            :key="tag"
                          >
                            {{ tag }}
                          </a-tag>
                          <a-tag
                            v-if="tag === '舒缓'"
                            color="orange"
                            style="align-items: center"
                            :key="tag"
                          >
                            {{ tag }}
                          </a-tag>
                          <a-tag
                            v-if="tag === '康辉'"
                            color="red"
                            style="align-items: center"
                            :key="tag"
                          >
                            {{ tag }}
                          </a-tag>
                          <a-tag
                            v-if="tag === '欧丽娟'"
                            color="cyan"
                            style="align-items: center"
                            :key="tag"
                          >
                            {{ tag }}
                          </a-tag>
                        </div>
                      </a-flex>
                    </template>
                  </a-card-meta>
                </a-card>
              </a-list-item>
            </template>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="2" tab="自定义声音">
          <a-typography-text class="Title4">自定义声音</a-typography-text>
          <a-divider />
          <a-list
            :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
            :data-source="custom"
            :loading="loading"
          >
            <template #renderItem="{ item: audio, index }">
              <a-list-item style="padding: 18px">
                <!-- 单张图片 -->
                <a-card hoverable class="homeCard">
                  <template #cover>
                    <img
                      style="height: 180px; border-radius: 20px; object-fit: cover"
                      :alt="audio.picture"
                      :src="audio.picture"
                    />
                  </template>
                  <a-card-meta style="padding: -12px">
                    <template #description>
                      <!-- 播放图标 -->
                      <!--                          <div @click="togglePlay(index)">-->
                      <!--                            <span v-if="!isPlaying[index]"-->
                      <!--                              ><PlayCircleOutlined style="font-size: 40px"-->
                      <!--                            /></span>-->
                      <!--                            &lt;!&ndash; 播放图标 &ndash;&gt;-->
                      <!--                            <span v-else><PauseCircleOutlined style="font-size: 40px" /></span>-->
                      <!--                            &lt;!&ndash; 暂停图标 &ndash;&gt;-->
                      <!--                          </div>-->
                      <!--                          <audio-->
                      <!--                            ref="audioPlayer"-->
                      <!--                            :src="audio.filePath"-->
                      <!--                            @ended="onAudioEnded(index)"-->
                      <!--                          ></audio>-->
                      <audio
                        style="width: 100%;height: 40px"
                        :src="audio.filePath"
                        controls
                      ></audio>
                      <a-flex style="align-items: center; margin-left: 12px; margin-top: 12px">
                        <div v-for="tag in audio.tags">
                          <a-tag
                            v-if="tag === '中文'"
                            color="blue"
                            style="align-items: center"
                            :key="tag"
                          >
                            {{ tag }}
                          </a-tag>
                          <a-tag
                            v-if="tag === '女声'"
                            color="green"
                            style="align-items: center"
                            :key="tag"
                          >
                            {{ tag }}
                          </a-tag>
                          <a-tag
                            v-if="tag === '舒缓'"
                            color="orange"
                            style="align-items: center"
                            :key="tag"
                          >
                            {{ tag }}
                          </a-tag>
                          <a-tag
                            v-if="tag === '康辉'"
                            color="red"
                            style="align-items: center"
                            :key="tag"
                          >
                            {{ tag }}
                          </a-tag>
                          <a-tag
                            v-if="tag === '欧丽娟'"
                            color="cyan"
                            style="align-items: center"
                            :key="tag"
                          >
                            {{ tag }}
                          </a-tag>
                        </div>
                      </a-flex>
                    </template>
                  </a-card-meta>
                </a-card>
              </a-list-item>
            </template>
          </a-list>
          <a-typography-text class="Title4">上传音频</a-typography-text>
          <a-divider />
          <a-space direction="horizontal" :size="100">
            <a-upload-dragger
              style="padding: 0"
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
                margin-right: 50px;
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
                <a-space>
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
                    <a-button
                      :icon="h(BorderOutlined)"
                      type="primary"
                      danger
                      @click="stopRecording"
                    />
                    <a-typography-text>停止录音</a-typography-text>
                  </a-space>
                  <div style="margin-left: 250px" v-if="recordAudioUrl">
                    <a-button @click="uploadFile">点击上传</a-button>
                  </div>
                </a-space>
              </div>
            </a-card>
          </a-space>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
// 数据
import { computed, h, onMounted, reactive, ref, watch } from 'vue'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { listAudioFileVoByPageUsingPost, uploadAudioUsingPost } from '@/api/audioFileController.ts'
import {
  AudioOutlined,
  BorderOutlined,
  CloseOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'
import { uploadFileUsingPost } from '@/api/fileController.ts' // 是否正在录制语音

const activeKey = ref('1')
// 是否正在录制语音
const isRecording = ref(false)
// 使用联合类型，进行媒体录制操作
const mediaRecorder = ref<MediaRecorder | null>(null)
const audioChunks = ref<Blob[]>([])
const audioBlob = ref<Blob | null>(null)
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
    const params = { biz: 'audio' }
    // 上传文件
    const res = await uploadAudioUsingPost(params, {}, file, {
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
      await fetchData();
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
      audioBlob.value = new Blob(audioChunks.value, { type: 'audio/wav' })
      recordAudioUrl.value = URL.createObjectURL(audioBlob.value)
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
const uploadFile = async () => {
  if (!audioBlob.value) {
    message.error('请先录制音频')
    return
  }
  // 将 Blob 转换为 File 对象
  const audioFile = new File([audioBlob.value], 'recording.wav', { type: 'audio/wav' })
  // 调用上传函数，传入 File 对象
  const res = await uploadAudioUsingPost({ biz: 'audio' }, {}, audioFile)
  if (res.data.code === 0) {
    message.success('音频上传成功')
  } else {
    message.error('音频上传失败：' + response.data.message)
  }
}

const dataList = ref<API.AudioFileVO[]>([])
const mandarin = ref<API.AudioFileVO[]>([])
const English = ref<API.AudioFileVO[]>([])
const dialect = ref<API.AudioFileVO[]>([])
const custom = ref<API.AudioFileVO[]>([])
const total = ref(0)
const audioPlayer = ref<HTMLAudioElement | null>(null)
const isPlaying = ref<boolean[]>(dataList.value.map(() => false))
// 切换播放/暂停
const togglePlay = (index: number) => {
  if (isPlaying.value[index]) {
    audioPlayer.value?.pause() // 暂停
  } else {
    audioPlayer.value?.play() // 播放
  }
  isPlaying.value[index] = !isPlaying.value[index] // 切换状态
}

// 音频播放结束时的回调
const onAudioEnded = (index: number) => {
  isPlaying.value[index] = false // 播放结束，更新状态
}

// 搜索条件
const searchParams = reactive<API.AudioFileQueryRequest>({
  current: 1,
  pageSize: 50,
  sortField: 'createTime',
  sortOrder: 'descend',
})

// 分页参数
const pagination = computed(() => {
  return {
    current: searchParams.current ?? 1,
    pageSize: searchParams.pageSize ?? 10,
    total: total.value,
    // 切换页号时，会修改搜索参数并获取数据
    onChange: (page: any, pageSize: any) => {
      searchParams.current = page
      searchParams.pageSize = pageSize
      fetchData()
    },
  }
})

// 获取数据
const fetchData = async () => {
  loading.value = true
  const res = await listAudioFileVoByPageUsingPost(searchParams)
  if (res.data.data) {
    dataList.value = res.data.data.records ?? []
    classifyDataList()
    console.log(dataList.value)
    total.value = res.data.data.total ?? 0
  } else {
    message.error('获取数据失败，' + res.data.message)
  }
  loading.value = false
}

// 分类函数
function classifyDataList() {
  // 清空原有的分类数组
  mandarin.value = []
  English.value = []
  dialect.value = []
  custom.value = []

  // 遍历 dataList 并根据 type 属性进行分类
  dataList.value.forEach((item) => {
    console.log(item.type)
    switch (item.type) {
      case 1:
        mandarin.value.push(item)
        break
      case 2:
        English.value.push(item)
        break
      case 3:
        dialect.value.push(item)
        break
      case 4:
        custom.value.push(item)
        break
      default:
        console.log(`未知类型: ${item.type}`)
    }
  })
}

// 页面加载时请求一次
onMounted(() => {
  fetchData()
})
</script>
<style scoped>
.ant-card .ant-card-body {
  padding: 18px !important;
  border-radius: 0 0 8px 8px;
}

.ant-divider.css-dev-only-do-not-override-1p3hq3p.ant-divider-horizontal {
  margin-top: 7px;
  height: 2px;
  background: #d9cfcf;
}

.home-header {
  display: flex;
  margin: 20px;
}

.art-text {
  font-family: 'Shadows Into Light', cursive;
  font-size: 40px;
  font-weight: bolder;
  margin-left: 20px;
  background: linear-gradient(45deg, red, orange, #00ffea, green, blue, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.Title1 {
  font-family: 'Shadows Into Light', cursive;
  font-size: 30px;
  font-weight: bolder;
  background: linear-gradient(45deg, white, blue, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  font-style: italic;
}

.Title2 {
  font-family: 'Shadows Into Light', cursive;
  font-size: 30px;
  font-style: italic;
  font-weight: bolder;
  background: linear-gradient(45deg, black, #0095ff, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.Title3 {
  font-family: 'Shadows Into Light', cursive;
  font-size: 30px;
  font-style: italic;
  font-weight: bolder;
  background: linear-gradient(45deg, white, #0095ff, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.Title4 {
  font-family: 'Shadows Into Light', cursive;
  font-size: 30px;
  font-style: italic;
  font-weight: bolder;
  background: linear-gradient(45deg, white, #d000ff, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.upload-audio {
}
</style>
