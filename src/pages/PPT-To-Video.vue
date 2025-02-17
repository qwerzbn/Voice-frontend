<template>
  <div class="ppt-converter">
    <h2 class="title">PPT转语音</h2>

    <div class="upload-section">
      <div
        class="upload-area"
        @drop.prevent="handleDrop"
        @dragover.prevent
        @click="triggerFileInput"
      >
        <input
          type="file"
          ref="fileInput"
          accept=".ppt,.pptx"
          @change="handleFileChange"
          class="hidden"
        >
        <i class="upload-icon">📁</i>
        <p>点击或拖拽上传PPT文件</p>
        <p v-if="selectedFile" class="selected-file">已选择: {{ selectedFile.name }}</p>
      </div>
    </div>

    <div class="voice-section">
      <h3>选择语音</h3>
      <select v-model="selectedVoice" class="voice-select">
        <option value="">请选择语音</option>
        <option v-for="voice in voices" :key="voice.id" :value="voice.id">
          {{ voice.name }}
        </option>
      </select>
    </div>

    <button
      @click="convertPPT"
      :disabled="!selectedFile || !selectedVoice || isConverting"
      class="convert-btn"
    >
      {{ isConverting ? '转换中...' : '开始转换' }}
    </button>

    <div v-if="downloadUrl" class="download-section">
      <p>转换完成！</p>
      <a :href="downloadUrl" download class="download-btn">下载有声PPT</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'

// 定义接口
interface Voice {
  id: number
  name: string
}

interface FileInputElement extends HTMLInputElement {
  files: FileList
}

// 定义ref类型
const fileInput: Ref<HTMLInputElement | null> = ref(null)
const selectedFile: Ref<File | null> = ref(null)
const selectedVoice: Ref<number | ''> = ref('')
const isConverting = ref(false)
const downloadUrl = ref('')

// 预设语音列表
const voices: Ref<Voice[]> = ref([
  { id: 1, name: '女声1' },
  { id: 2, name: '男声1' },
  { id: 3, name: '女声2' },
  { id: 4, name: '男声2' },
])

// 触发文件选择
const triggerFileInput = (): void => {
  fileInput.value?.click()
}

// 验证文件类型
const isValidPPTFile = (file: File): boolean => {
  return file.name.endsWith('.ppt') || file.name.endsWith('.pptx')
}

// 处理文件选择
const handleFileChange = (event: Event): void => {
  const input = event.target as FileInputElement
  const file = input.files[0]

  if (file && isValidPPTFile(file)) {
    selectedFile.value = file
  } else {
    alert('请上传PPT文件')
  }
}

// 处理拖拽上传
const handleDrop = (event: DragEvent): void => {
  const file = event.dataTransfer?.files[0]

  if (file && isValidPPTFile(file)) {
    selectedFile.value = file
  } else {
    alert('请上传PPT文件')
  }
}

// 转换PPT
const convertPPT = async (): Promise<void> => {
  if (!selectedFile.value || !selectedVoice.value) return

  isConverting.value = true
  try {
    // 创建 FormData 用于文件上传
    const formData = new FormData()
    formData.append('file', selectedFile.value)
    formData.append('voiceId', selectedVoice.value.toString())

    // 这里添加实际的API调用
    // const response = await axios.post('/api/convert', formData)
    // downloadUrl.value = response.data.downloadUrl

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    downloadUrl.value = 'path/to/converted/file.zip'
  } catch (error) {
    alert('转换失败，请重试')
    console.error('转换错误:', error)
  } finally {
    isConverting.value = false
  }
}
</script>

<style scoped>
.ppt-converter {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
}

.upload-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 20px;
}

.upload-area:hover {
  border-color: #409EFF;
}

.hidden {
  display: none;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.voice-section {
  margin: 20px 0;
}

.voice-select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.convert-btn {
  width: 100%;
  padding: 12px;
  background-color: #409EFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px 0;
}

.convert-btn:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.download-section {
  text-align: center;
  margin-top: 20px;
}

.download-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #67C23A;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.selected-file {
  margin-top: 10px;
  color: #666;
}
</style>
