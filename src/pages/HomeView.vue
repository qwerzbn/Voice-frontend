<template>
  <div id="vue-devtools-anchor">
    <!-- 图片列表 -->
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
      :data-source="dataList"
      :pagination="pagination"
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
                <a-row>
                  <a-col flex="30px">
                    <!-- 播放图标 -->
                    <div @click="togglePlay(index)">
                      <span v-if="!isPlaying[index]"
                        ><PlayCircleOutlined style="font-size: 40px"
                      /></span>
                      <!-- 播放图标 -->
                      <span v-else><PauseCircleOutlined style="font-size: 40px" /></span>
                      <!-- 暂停图标 -->
                    </div>
                    <audio
                      ref="audioPlayer"
                      :src="audio.filePath"
                      @ended="onAudioEnded(index)"
                    ></audio>
                  </a-col>
                  <a-col flex="auto">
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
                      </div>
                    </a-flex>
                  </a-col>
                </a-row>
              </template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
// 数据
import { computed, onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { listAudioFileVoByPageUsingPost } from '@/api/audioFileController.ts'
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons-vue'

const dataList = ref<API.AudioFileVO[]>([])
const total = ref(0)
const loading = ref(true)
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
  pageSize: 12,
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
    total.value = res.data.data.total ?? 0
  } else {
    message.error('获取数据失败，' + res.data.message)
  }
  loading.value = false
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
</style>
