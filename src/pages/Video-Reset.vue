<template>
  <div class="voice-changer">
    <h2 class="title">音视频声音置换</h2>

    <!-- 视频上传区域 -->
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
          accept="video/*,audio/*"
          @change="handleFileChange"
          class="hidden"
        >
        <i class="upload-icon">🎥</i>
        <p>点击或拖拽上传音视频文件</p>
        <p v-if="mediaFile" class="selected-file">
          已选择: {{ mediaFile.name }}
        </p>
      </div>
    </div>

    <!-- 预览区域 -->
    <div v-if="mediaFile" class="preview-section">
      <h3>预览</h3>
      <video
        v-if="isVideo"
        ref="videoPlayer"
        controls
        class="media-player"
        @timeupdate="handleTimeUpdate"
      >
        <source :src="mediaUrl" :type="mediaFile.type">
        <track
          v-if="subtitlesUrl"
          kind="subtitles"
          srclang="zh"
          :src="subtitlesUrl"
          label="字幕"
          default
        >
      </video>
      <audio
        v-else
        ref="audioPlayer"
        controls
        class="media-player"
        @timeupdate="handleTimeUpdate"
      >
        <source :src="mediaUrl" :type="mediaFile.type">
      </audio>
    </div>

    <!-- 声音设置区域 -->
    <div class="voice-settings">
      <h3>声音设置</h3>

      <!-- 预设声音选择 -->
      <div class="setting-item">
        <label>预设声音：</label>
        <select v-model="selectedVoice" class="voice-select">
          <option value="">请选择声音</option>
          <option v-for="voice in voices" :key="voice.id" :value="voice.id">
            {{ voice.name }}
          </option>
        </select>
      </div>

      <!-- 音调调节 -->
      <div class="setting-item">
        <label>音调调节：</label>
        <input
          type="range"
          v-model="pitch"
          min="0.5"
          max="2"
          step="0.1"
          class="slider"
        >
        <span>{{ pitch }}x</span>
      </div>

      <!-- 语速调节 -->
      <div class="setting-item">
        <label>语速调节：</label>
        <input
          type="range"
          v-model="speed"
          min="0.5"
          max="2"
          step="0.1"
          class="slider"
        >
        <span>{{ speed }}x</span>
      </div>
    </div>

    <!-- 字幕设置 -->
    <div class="subtitle-section">
      <h3>字幕设置</h3>
      <div class="subtitle-controls">
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="autoGenerateSubtitles"
          > 自动生成字幕
        </label>
        <div class="subtitle-upload">
          <label>或上传字幕文件（.srt/.vtt）：</label>
          <input
            type="file"
            @change="handleSubtitleUpload"
            accept=".srt,.vtt"
            class="subtitle-input"
          >
        </div>
      </div>
    </div>

    <!-- 转换按钮 -->
    <button
      @click="startConversion"
      :disabled="!mediaFile || !selectedVoice || isConverting"
      class="convert-btn"
    >
      {{ isConverting ? '处理中...' : '开始转换' }}
    </button>

    <!-- 下载区域 -->
    <div v-if="convertedUrl" class="download-section">
      <p>转换完成！</p>
      <div class="preview-converted">
        <video
          v-if="isVideo"
          controls
          class="media-player"
        >
          <source :src="convertedUrl" type="video/mp4">
          <track
            v-if="subtitlesUrl"
            kind="subtitles"
            srclang="zh"
            :src="subtitlesUrl"
            label="字幕"
            default
          >
        </video>
        <audio
          v-else
          controls
          class="media-player"
        >
          <source :src="convertedUrl" type="audio/mp3">
        </audio>
      </div>
      <a :href="convertedUrl" download class="download-btn">下载转换后的文件</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

interface Voice {
  id: number
  name: string
}

interface FileInputElement extends HTMLInputElement {
  files: FileList
}

// 文件相关
const fileInput: Ref<HTMLInputElement | null> = ref(null)
const mediaFile: Ref<File | null> = ref(null)
const mediaUrl: Ref<string> = ref('')
const isConverting = ref(false)
const convertedUrl: Ref<string> = ref('')
const subtitlesUrl: Ref<string> = ref('')

// 播放器引用
const videoPlayer: Ref<HTMLVideoElement | null> = ref(null)
const audioPlayer: Ref<HTMLAudioElement | null> = ref(null)

// 声音设置
const selectedVoice: Ref<number | ''> = ref('')
const pitch = ref(1)
const speed = ref(1)

// 字幕设置
const autoGenerateSubtitles = ref(false)

// 预设声音列表
const voices: Ref<Voice[]> = ref([
  { id: 1, name: '成年男声' },
  { id: 2, name: '成年女声' },
  { id: 3, name: '儿童声音' },
  { id: 4, name: '机器人声' },
])

// 计算是否为视频文件
const isVideo = computed(() => {
  return mediaFile.value?.type.startsWith('video/')
})

// 触发文件选择
const triggerFileInput = (): void => {
  fileInput.value?.click()
}

// 处理文件选择
const handleFileChange = (event: Event): void => {
  const input = event.target as FileInputElement
  const file = input.files[0]

  if (file && (file.type.startsWith('video/') || file.type.startsWith('audio/'))) {
    mediaFile.value = file
    mediaUrl.value = URL.createObjectURL(file)
  } else {
    alert('请上传有效的音视频文件')
  }
}

// 处理拖拽上传
const handleDrop = (event: DragEvent): void => {
  const file = event.dataTransfer?.files[0]

  if (file && (file.type.startsWith('video/') || file.type.startsWith('audio/'))) {
    mediaFile.value = file
    mediaUrl.value = URL.createObjectURL(file)
  } else {
    alert('请上传有效的音视频文件')
  }
}

// 处理字幕上传
const handleSubtitleUpload = (event: Event): void => {
  const input = event.target as FileInputElement
  const file = input.files[0]

  if (file && (file.name.endsWith('.srt') || file.name.endsWith('.vtt'))) {
    subtitlesUrl.value = URL.createObjectURL(file)
  } else {
    alert('请上传.srt或.vtt格式的字幕文件')
  }
}

// 处理时间更新
const handleTimeUpdate = (): void => {
  // 这里可以添加字幕同步逻辑
}

// 开始转换
const startConversion = async (): Promise<void> => {
  if (!mediaFile.value || !selectedVoice.value) return

  isConverting.value = true
  try {
    const formData = new FormData()
    formData.append('file', mediaFile.value)
    formData.append('voiceId', selectedVoice.value.toString())
    formData.append('pitch', pitch.value.toString())
    formData.append('speed', speed.value.toString())
    formData.append('generateSubtitles', autoGenerateSubtitles.value.toString())

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 3000))
    convertedUrl.value = mediaUrl.value // 实际应该使用API返回的URL

    if (autoGenerateSubtitles.value) {
      // 模拟生成字幕
      subtitlesUrl.value = 'path/to/generated/subtitles.vtt'
    }
  } catch (error) {
    alert('转换失败，请重试')
    console.error('转换错误:', error)
  } finally {
    isConverting.value = false
  }
}
</script>

<style scoped>
.voice-changer {
  max-width: 800px;
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

.preview-section {
  margin: 20px 0;
}

.media-player {
  width: 100%;
  max-height: 400px;
  margin: 10px 0;
}

.voice-settings, .subtitle-section {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.setting-item {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.voice-select {
  width: 200px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.slider {
  flex: 1;
}

.subtitle-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.subtitle-upload {
  display: flex;
  flex-direction: column;
  gap: 5px;
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

.preview-converted {
  margin: 20px 0;
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
