<template>
  <div id="vue-devtools-anchor">
    <!-- 图片列表 -->
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
      :data-source="dataList"
      :pagination="pagination"
      :loading="loading"
    >
      <template #renderItem="{ item: audio }">
        <a-list-item style="padding: 18px">
          <!-- 单张图片 -->
          <a-card hoverable>
            <template #cover>
              <img
                style="height: 180px;  border-radius: 20px;object-fit: cover"
                :alt="audio.picture"
                :src="audio.picture"
              />
            </template>
            <a-card-meta :title="audio.title">
              <template #description>
                {{ audio.description }}
                <!--                <a-flex>-->
                <!--                  <a-tag color="green">-->
                <!--                    {{ audio.category ?? '默认' }}-->
                <!--                  </a-tag>-->
                <!--                  <a-tag v-for="tag in picture.tags" :key="tag">-->
                <!--                    {{ tag }}-->
                <!--                  </a-tag>-->
                <!--                </a-flex>-->
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

const dataList = ref<API.AudioFileVO[]>([])
const total = ref(0)
const loading = ref(true)

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
