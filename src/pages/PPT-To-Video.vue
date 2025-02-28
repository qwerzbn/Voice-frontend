<!--<template>-->
<!--  <div class="ppt-converter">-->
<!--    <h2 class="title">PPT转语音</h2>-->

<!--    <div class="upload-section">-->
<!--      <div-->
<!--        class="upload-area"-->
<!--        @drop.prevent="handleDrop"-->
<!--        @dragover.prevent-->
<!--        @click="triggerFileInput"-->
<!--      >-->
<!--        <input-->
<!--          type="file"-->
<!--          ref="fileInput"-->
<!--          accept=".ppt,.pptx"-->
<!--          @change="handleFileChange"-->
<!--          class="hidden"-->
<!--        />-->
<!--        <i class="upload-icon">📁</i>-->
<!--        <p>点击或拖拽上传PPT文件</p>-->
<!--        <p v-if="selectedFile" class="selected-file">已选择: {{ selectedFile.name }}</p>-->
<!--        <div v-if="isGeneratingPreview">-->
<!--          <div class="loading-spinner"></div>-->
<!--          <p>-->
<!--            <LoadingOutlined style="margin-left: 8px" />-->
<!--            <a-typography-text style="font-size: large"> 正在生成预览...</a-typography-text>-->
<!--          </p>-->
<!--        </div>-->
<!--        <div v-if="isGeneratedPreview">-->
<!--          <CheckCircleOutlined style="color: green; font-size: large; margin-right: 8px" />-->
<!--          <a-typography-text type="success" style="font-size: large">-->
<!--            生成预览成功-->
<!--          </a-typography-text>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    &lt;!&ndash; 添加预览区域 &ndash;&gt;-->
<!--    <div v-if="selectedFile && previewUrls.length > 0" class="preview-section">-->
<!--      <div class="preview-controls">-->
<!--        <a-button-->
<!--          type="link"-->
<!--          style="margin-right: 12px"-->
<!--          :icon="h(StepBackwardOutlined, { style: { fontSize: '24px' } })"-->
<!--          @click="prevSlide"-->
<!--          :disabled="currentSlide <= 0"-->
<!--          class="nav-btn"-->
<!--        />-->
<!--        <span class="slide-info" style="font-size: large"-->
<!--          >{{ currentSlide + 1 }} / {{ totalSlides }}</span-->
<!--        >-->
<!--        <a-button-->
<!--          type="link"-->
<!--          style="margin-left: 12px"-->
<!--          :icon="h(StepForwardOutlined, { style: { fontSize: '24px' } })"-->
<!--          @click="nextSlide"-->
<!--          :disabled="currentSlide >= totalSlides - 1"-->
<!--          class="nav-btn"-->
<!--        />-->
<!--      </div>-->
<!--      <div class="preview-container">-->
<!--        <img-->
<!--          v-if="currentPreviewUrl"-->
<!--          :src="currentPreviewUrl"-->
<!--          style=""-->
<!--          alt="PPT预览"-->
<!--          class="preview-image"-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="voice-section">-->
<!--      <h3>选择语音</h3>-->

<!--      <select v-model="selectedVoice" class="voice-select">-->
<!--        <option v-if="!selectedVoice" value="">请选择语音</option>-->
<!--        <option v-for="voice in voices" :key="voice.id" :value="voice.id">-->
<!--          {{ voice.name }}-->
<!--        </option>-->
<!--      </select>-->
<!--    </div>-->

<!--    <button-->
<!--      @click="convertPPT"-->
<!--      :disabled="!selectedFile || !selectedVoice || isConverting"-->
<!--      class="convert-btn"-->
<!--    >-->
<!--      {{ isConverting ? '转换中...' : '开始转换' }}-->
<!--    </button>-->

<!--    <div v-if="downloadUrl" class="download-section">-->
<!--      <p>转换完成！</p>-->
<!--      <a :href="downloadUrl" download class="download-btn">下载有声PPT</a>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { computed, h, ref, type Ref, watch } from 'vue'-->
<!--import { convertPptUsingPost, generatePreviewUsingPost } from '@/api/pptController.ts'-->
<!--import {-->
<!--  CheckCircleOutlined,-->
<!--  LoadingOutlined,-->
<!--  StepBackwardOutlined,-->
<!--  StepForwardOutlined,-->
<!--} from '@ant-design/icons-vue'-->
<!--import { message } from 'ant-design-vue' // 定义接口-->

<!--// 定义接口-->
<!--interface Voice {-->
<!--  id: number-->
<!--  name: string-->
<!--}-->

<!--interface FileInputElement extends HTMLInputElement {-->
<!--  files: FileList-->
<!--}-->

<!--const previewUrls: Ref<string[]> = ref([])-->
<!--const currentSlide = ref(0)-->
<!--const totalSlides = ref(0)-->
<!--const isGeneratingPreview = ref(false)-->
<!--const isGeneratedPreview = ref(false)-->
<!--// 计算当前预览URL-->
<!--const currentPreviewUrl = computed(() => previewUrls.value[currentSlide.value] || '')-->

<!--// 生成预览-->
<!--const generatePreview = async (file: File) => {-->
<!--  console.log('生成预览')-->
<!--  if (!file) return-->
<!--  isGeneratingPreview.value = true-->
<!--  try {-->
<!--    const formData = new FormData()-->
<!--    formData.append('file', file)-->
<!--    const response = await generatePreviewUsingPost(formData, file)-->
<!--    if (response.status === 200) {-->
<!--      const data = response.data-->
<!--      // @ts-ignore-->
<!--      previewUrls.value = data.slides // 预期返回幻灯片图片URL数组-->
<!--      // @ts-ignore-->
<!--      totalSlides.value = data.slides.length-->
<!--      currentSlide.value = 0-->
<!--      isGeneratedPreview.value = true-->
<!--    } else {-->
<!--      message.error('生成预览失败:')-->
<!--    }-->
<!--  } catch (error) {-->
<!--    message.error('生成预览失败:' + error)-->
<!--    previewUrls.value = []-->
<!--    totalSlides.value = 0-->
<!--  } finally {-->
<!--    isGeneratingPreview.value = false-->
<!--  }-->
<!--}-->

<!--// 切换幻灯片-->
<!--const prevSlide = () => {-->
<!--  if (currentSlide.value > 0) {-->
<!--    currentSlide.value&#45;&#45;-->
<!--  }-->
<!--}-->

<!--const nextSlide = () => {-->
<!--  if (currentSlide.value < totalSlides.value - 1) {-->
<!--    currentSlide.value++-->
<!--  }-->
<!--}-->
<!--// 定义ref类型-->
<!--const fileInput: Ref<HTMLInputElement | null> = ref(null)-->
<!--const selectedFile: Ref<File | null> = ref(null)-->
<!--const selectedVoice: Ref<number | ''> = ref('')-->
<!--const isConverting = ref(false)-->
<!--const downloadUrl = ref('')-->

<!--// 预设语音列表-->
<!--const voices: Ref<Voice[]> = ref([-->
<!--  { id: 3, name: '女声1' },-->
<!--  { id: 1, name: '男声1' },-->
<!--  { id: 4, name: '女声2' },-->
<!--  { id: 2, name: '男声2' },-->
<!--])-->

<!--// 触发文件选择-->
<!--const triggerFileInput = (): void => {-->
<!--  fileInput.value?.click()-->
<!--}-->

<!--// 验证文件类型-->
<!--const isValidPPTFile = (file: File): boolean => {-->
<!--  return file.name.endsWith('.ppt') || file.name.endsWith('.pptx')-->
<!--}-->

<!--// 处理文件选择-->
<!--const handleFileChange = (event: Event): void => {-->
<!--  const input = event.target as FileInputElement-->
<!--  const file = input.files[0]-->

<!--  if (file && isValidPPTFile(file)) {-->
<!--    selectedFile.value = file-->
<!--  } else {-->
<!--    alert('请上传PPT文件')-->
<!--  }-->
<!--}-->

<!--// 处理拖拽上传-->
<!--const handleDrop = (event: DragEvent): void => {-->
<!--  const file = event.dataTransfer?.files[0]-->

<!--  if (file && isValidPPTFile(file)) {-->
<!--    selectedFile.value = file-->
<!--  } else {-->
<!--    alert('请上传PPT文件')-->
<!--  }-->
<!--}-->
<!--// 转换PPT-->
<!--const convertPPT = async (): Promise<void> => {-->
<!--  if (!selectedFile.value || !selectedVoice.value) return-->
<!--  isConverting.value = true-->
<!--  if (previewUrls.value && previewUrls.value.length > 0) {-->
<!--    console.log(previewUrls.value)-->
<!--    const createVideo = {-->
<!--      imageList: previewUrls.value,-->
<!--      type: selectedVoice.value,-->
<!--    }-->
<!--    const response = await convertPptUsingPost(createVideo)-->
<!--    if (response.data.code === 0){-->
<!--      downloadUrl.value = response.data.data-->
<!--    }else {-->
<!--      alert('转换失败')-->
<!--    }-->
<!--  } else {-->
<!--    alert('请先生成预览')-->
<!--    return-->
<!--  }-->
<!--  isConverting.value = false-->
<!--}-->
<!--// 监听文件变化，生成预览-->
<!--watch(-->
<!--  () => selectedFile.value,-->
<!--  async (newFile) => {-->
<!--    if (newFile && isValidPPTFile(newFile)) {-->
<!--      await generatePreview(newFile)-->
<!--    } else {-->
<!--      previewUrls.value = []-->
<!--      totalSlides.value = 0-->
<!--      currentSlide.value = 0-->
<!--    }-->
<!--  },-->
<!--)-->
<!--</script>-->

<!--<style scoped>-->
<!--.ppt-converter {-->
<!--  max-width: 800px;-->
<!--  margin: 0 auto;-->
<!--  padding: 20px;-->
<!--}-->

<!--.title {-->
<!--  text-align: center;-->
<!--  margin-bottom: 30px;-->
<!--}-->

<!--.upload-area {-->
<!--  border: 2px dashed #ccc;-->
<!--  border-radius: 8px;-->
<!--  padding: 20px;-->
<!--  text-align: center;-->
<!--  cursor: pointer;-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.upload-area:hover {-->
<!--  border-color: #409eff;-->
<!--}-->

<!--.hidden {-->
<!--  display: none;-->
<!--}-->

<!--.upload-icon {-->
<!--  font-size: 48px;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.voice-section {-->
<!--  margin: 20px 0;-->
<!--}-->

<!--.voice-select {-->
<!--  width: 100%;-->
<!--  padding: 8px;-->
<!--  border-radius: 4px;-->
<!--  border: 1px solid #ddd;-->
<!--}-->

<!--.convert-btn {-->
<!--  width: 100%;-->
<!--  padding: 12px;-->
<!--  background-color: #409eff;-->
<!--  color: white;-->
<!--  border: none;-->
<!--  border-radius: 4px;-->
<!--  cursor: pointer;-->
<!--  margin: 20px 0;-->
<!--}-->

<!--.convert-btn:disabled {-->
<!--  background-color: #a0cfff;-->
<!--  cursor: not-allowed;-->
<!--}-->

<!--.download-section {-->
<!--  text-align: center;-->
<!--  margin-top: 20px;-->
<!--}-->

<!--.download-btn {-->
<!--  display: inline-block;-->
<!--  padding: 10px 20px;-->
<!--  background-color: #67c23a;-->
<!--  color: white;-->
<!--  text-decoration: none;-->
<!--  border-radius: 4px;-->
<!--}-->

<!--.selected-file {-->
<!--  margin-top: 10px;-->
<!--  color: #666;-->
<!--}-->

<!--.preview-container {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  height: 100%; /* 确保容器有高度 */-->
<!--}-->

<!--.preview-controls {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  margin-bottom: 12px;-->
<!--}-->

<!--.preview-image {-->
<!--  max-width: 100%;-->
<!--  max-height: 100%;-->
<!--}-->
<!--</style>-->
<template>
  <a-card class="ppt-converter">
    <template #title>
      <a-space>
        <file-text-outlined />
        <span>PPT转语音</span>
      </a-space>
    </template>

    <a-steps :current="currentStep" class="steps-section">
      <a-step title="上传PPT" description="支持.ppt/.pptx格式" />
      <a-step title="预览确认" description="查看幻灯片内容" />
      <a-step title="选择语音" description="选择合适的配音" />
    </a-steps>

    <!-- 上传区域 -->
    <div class="upload-section">
      <a-upload-dragger
        :maxCount="1"
        accept=".ppt,.pptx,.PPT,.PPTX"
        :beforeUpload="() => false"
        @change="handleFileChange"
        :fileList="fileList"
        :multiple="false"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined />
        </p>
        <p class="ant-upload-text">点击或拖拽上传PPT文件</p>
        <p class="ant-upload-hint">支持 .ppt 和 .pptx 格式文件</p>
        <div v-if="isGeneratingPreview">
          <div class="loading-spinner"></div>
          <p>
            <LoadingOutlined style="margin-left: 8px" />
            <a-typography-text style="font-size: large"> 正在生成预览...</a-typography-text>
          </p>
        </div>
        <div v-if="isGeneratedPreview">
          <CheckCircleOutlined style="color: green; font-size: large; margin-right: 8px" />
          <a-typography-text type="success" style="font-size: large">
            生成预览成功
          </a-typography-text>
        </div>
      </a-upload-dragger>
    </div>

    <!-- 预览区域 -->
    <div v-if="selectedFile && previewUrls.length > 0" class="preview-section">
      <div class="preview-header">
        <a-space>
          <eye-outlined />
          <span class="preview-title">预览幻灯片</span>
        </a-space>
      </div>

      <div class="preview-container">
        <a-spin :spinning="isGeneratingPreview">
          <template #indicator>
            <div class="generating-preview">
              <a-progress
                :percent="previewProgress"
                :status="previewProgress >= 100 ? 'success' : 'active'"
                :show-info="false"
                :stroke-width="4"
              />
              <div class="progress-info">
                <loading-outlined v-if="previewProgress < 100" spin />
                <check-circle-outlined v-else style="color: #52c41a" />
                <span>{{
                  previewProgress >= 100 ? '预览生成完成' : `正在生成预览 ${previewProgress}%`
                }}</span>
              </div>
            </div>
          </template>

          <div class="preview-content">
            <img
              v-if="currentPreviewUrl"
              :src="currentPreviewUrl"
              alt="PPT预览"
              class="preview-image"
            />

            <div class="preview-controls">
              <a-button
                type="primary"
                shape="circle"
                :disabled="currentSlide <= 0"
                @click="prevSlide"
              >
                <template #icon>
                  <left-outlined />
                </template>
              </a-button>

              <a-typography-text class="slide-counter">
                {{ currentSlide + 1 }} / {{ totalSlides }}
              </a-typography-text>

              <a-button
                type="primary"
                shape="circle"
                :disabled="currentSlide >= totalSlides - 1"
                @click="nextSlide"
              >
                <template #icon>
                  <right-outlined />
                </template>
              </a-button>
            </div>
          </div>
        </a-spin>
      </div>
    </div>

    <!-- 语音选择区域 -->
    <a-card v-if="selectedFile" class="voice-section">
      <template #title>
        <a-space>
          <sound-outlined />
          <span>选择语音</span>
        </a-space>
      </template>

      <a-radio-group v-model:value="selectedVoice" class="voice-options">
        <a-radio-button v-for="voice in voices" :key="voice.id" :value="voice.id">
          {{ voice.name }}
        </a-radio-button>
      </a-radio-group>
    </a-card>

    <!-- 转换按钮 -->
    <div class="action-section">
      <a-button
        type="primary"
        size="large"
        :loading="isConverting"
        :disabled="!selectedFile || !selectedVoice || isConverting"
        @click="convertPPT"
        block
      >
        <template #icon>
          <thunderbolt-outlined />
        </template>
        {{ isConverting ? '正在转换中...' : '开始转换' }}
      </a-button>
    </div>

    <!-- 下载结果 -->
    <a-result
      v-if="downloadUrl"
      status="success"
      title="转换成功！"
      sub-title="您的有声PPT已经准备就绪"
    >
      <template #extra>
        <a-button type="primary" size="large" @click="handleDownload">
          <template #icon>
            <download-outlined />
          </template>
          下载有声PPT
        </a-button>
      </template>
    </a-result>
  </a-card>
</template>

<script setup lang="ts">
import { computed, ref, type Ref, watch } from 'vue'
import { convertPptUsingPost, generatePreviewUsingPost } from '@/api/pptController'
import type { UploadChangeParam } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import {
  CheckCircleOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileTextOutlined,
  InboxOutlined,
  LeftOutlined,
  LoadingOutlined,
  RightOutlined,
  SoundOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons-vue'

// 接口定义
interface Voice {
  id: number
  name: string
}

// 状态管理
const currentStep = ref(0)
const fileList = ref([])
const selectedFile: Ref<File | null> = ref(null)
const selectedVoice = ref<number | null>(null)
const isConverting = ref(false)
const isGeneratingPreview = ref(false)
const isGeneratedPreview = ref(false)
const downloadUrl = ref('')
const previewUrls: Ref<string[]> = ref([])
const currentSlide = ref(0)
const totalSlides = ref(0)
const previewProgress = ref(0)

// 预设语音列表
const voices: Voice[] = [
  { id: 3, name: '女声1' },
  { id: 1, name: '男声1' },
  { id: 4, name: '女声2' },
  { id: 2, name: '男声2' },
]

// 计算属性
const currentPreviewUrl = computed(() => previewUrls.value[currentSlide.value] || '')

// 文件处理
const handleFileChange = (info: UploadChangeParam) => {
  const file = info.file.originFileObj || info.file
  console.log('上传的文件:', file) // 添加日志便于调试

  if (!file) {
    message.error('文件上传失败，请重试')
    fileList.value = []
    return
  }

  if (isValidPPTFile(file)) {
    selectedFile.value = file
    fileList.value = [info.file]
    currentStep.value = 1
    generatePreview(file)
  } else {
    message.error(`不支持的文件格式：${file.name}。请上传PPT文件（.ppt或.pptx格式）`)
    fileList.value = []
  }
}

// 文件验证
const isValidPPTFile = (file: File): boolean => {
  const fileName = file.name.toLowerCase()
  return fileName.endsWith('.ppt') || fileName.endsWith('.pptx')
}

// 预览生成
const generatePreview = async (file: File) => {
  isGeneratingPreview.value = true
  previewProgress.value = 0

  try {
    const formData = new FormData()
    formData.append('file', file)

    // 模拟进度更新
    const progressInterval = setInterval(() => {
      if (previewProgress.value < 90) {
        previewProgress.value += Math.floor(Math.random() * 10) + 1
      }
    }, 300)

    const response = await generatePreviewUsingPost(formData, file)

    clearInterval(progressInterval)

    if (response.status === 200) {
      previewProgress.value = 100
      previewUrls.value = response.data.slides
      totalSlides.value = response.data.slides.length
      currentSlide.value = 0
      currentStep.value = 2
      message.success('预览生成成功')
      isGeneratedPreview.value = true
    }
  } catch (error) {
    previewProgress.value = 0
    message.error('预览生成失败')
    previewUrls.value = []
    totalSlides.value = 0
  } finally {
    isGeneratingPreview.value = false
  }
}

// 幻灯片控制
const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const nextSlide = () => {
  if (currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++
  }
}

// PPT转换
const convertPPT = async () => {
  if (!selectedFile.value || !selectedVoice.value) return
  isConverting.value = true
  try {
    if (previewUrls.value && previewUrls.value.length > 0) {
      const createVideo = {
        imageList: previewUrls.value,
        type: selectedVoice.value,
      }
      const response = await convertPptUsingPost(createVideo)
      if (response.data.code === 0) {
        downloadUrl.value = response.data.data
        message.success('转换成功')
      } else {
        message.error('转换失败')
      }
    }
  } catch (error) {
    message.error('转换失败')
  } finally {
    isConverting.value = false
  }
}

// 下载处理
const handleDownload = () => {
  if (downloadUrl.value) {
    window.open(downloadUrl.value)
  }
}

// 监听文件变化
watch(selectedFile, (newFile) => {
  if (!newFile) {
    previewUrls.value = []
    totalSlides.value = 0
    currentSlide.value = 0
    currentStep.value = 0
  }
})
</script>

<style scoped>
.ppt-converter {
  max-width: 1400px;
  margin: 24px auto;
  width: 95%;
}

.steps-section {
  margin: 24px 0 36px;
}

.upload-section {
  margin: 24px 0 0 150px;
}

.preview-section {
  margin: 36px -24px;
  background-color: #f5f5f5;
  padding: 24px 0;
}

.preview-header {
  padding: 0 24px;
  margin-bottom: 24px;
}

.preview-title {
  font-size: 16px;
  font-weight: 500;
}

.preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.preview-content {
  width: 100%;
  max-width: 1400px;
  position: relative;
  padding: 0 24px;
}

.generating-preview {
  padding: 24px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.progress-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  color: rgba(0, 0, 0, 0.85);
}

.preview-image {
  width: 100%;
  height: auto;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.preview-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding: 16px 0;
}

.slide-counter {
  font-size: 16px;
  margin: 0 16px;
}

.voice-section {
  margin: 24px 0;
}

.voice-options {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 16px 0;
}

.action-section {
  margin: 24px 0;
  display: flex;
  justify-content: center;
}

@media (min-width: 1600px) {
  .ppt-converter {
    max-width: 1600px;
  }

  .preview-content {
    max-width: 1600px;
  }
}
</style>
