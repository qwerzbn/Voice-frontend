<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  UserOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

// 定义接口
interface BaseFile {
  id: number;
  title: string;
  thumbnail: string;
  createTime: Date;
  size: number;
}

interface VideoFile extends BaseFile {
  duration: string;
}

interface PPTFile extends BaseFile {
  slideCount: number;
}

// 状态变量
const activeTab = ref<'videos' | 'ppts'>('videos');
const videoList = ref<VideoFile[]>([]);
const pptList = ref<PPTFile[]>([]);
const deleteModalVisible = ref<boolean>(false);
const fileToDelete = ref<VideoFile | PPTFile | null>(null);

// 模拟数据加载
onMounted(async () => {
  // 这里替换为实际的API调用
  videoList.value = [
    {
      id: 1,
      title: '示例视频1',
      thumbnail: 'video-thumb-1.jpg',
      duration: '3:45',
      createTime: new Date(),
      size: 1024 * 1024 * 15, // 15MB
    },
    // ... 更多视频数据
  ];

  pptList.value = [
    {
      id: 1,
      title: '示例PPT1',
      thumbnail: 'ppt-thumb-1.jpg',
      slideCount: 24,
      createTime: new Date(),
      size: 1024 * 1024 * 5, // 5MB
    },
    // ... 更多PPT数据
  ];
});

// 工具函数
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const formatSize = (bytes: number): string => {
  const sizes: string[] = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i: number = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};

// 处理函数
const handleDownload = (file: VideoFile | PPTFile): void => {
  // 实现下载逻辑
  message.success(`开始下载：${file.title}`);
};

const handleEdit = (file: VideoFile | PPTFile): void => {
  // 实现编辑逻辑
  message.info(`编辑文件：${file.title}`);
};

const handleDelete = (file: VideoFile | PPTFile): void => {
  fileToDelete.value = file;
  deleteModalVisible.value = true;
};

const confirmDelete = async (): Promise<void> => {
  try {
    if (!fileToDelete.value) return;
    // 实现删除逻辑
    message.success(`删除成功：${fileToDelete.value.title}`);
    deleteModalVisible.value = false;
  } catch (error) {
    message.error('删除失败');
  }
};

const cancelDelete = (): void => {
  deleteModalVisible.value = false;
  fileToDelete.value = null;
};
</script>

<template>
  <div class="person-center">
    <a-row :gutter="[24, 24]">
      <!-- 页面标题 -->
      <a-col :span="24">
        <div class="page-header">
          <a-typography-title :level="2">
            <user-outlined /> 个人中心
          </a-typography-title>
        </div>
      </a-col>

      <!-- 内容区域 -->
      <a-col :span="24">
        <a-tabs v-model:activeKey="activeTab">
          <!-- 视频文件标签页 -->
          <a-tab-pane key="videos" tab="我的视频">
            <div class="file-list">
              <a-row :gutter="[16, 16]">
                <a-col :xs="24" :sm="12" :md="8" :lg="6" v-for="video in videoList" :key="video.id">
                  <a-card hoverable class="file-card">
                    <template #cover>
                      <div class="video-cover">
                        <img :src="video.thumbnail" :alt="video.title" />
                        <div class="video-duration">{{ video.duration }}</div>
                      </div>
                    </template>
                    <template #actions>
                      <a-tooltip title="下载">
                        <download-outlined @click="handleDownload(video)" />
                      </a-tooltip>
                      <a-tooltip title="编辑">
                        <edit-outlined @click="handleEdit(video)" />
                      </a-tooltip>
                      <a-tooltip title="删除">
                        <delete-outlined @click="handleDelete(video)" />
                      </a-tooltip>
                    </template>
                    <a-card-meta :title="video.title">
                      <template #description>
                        <div class="file-info">
                          <p>创建时间：{{ formatDate(video.createTime) }}</p>
                          <p>文件大小：{{ formatSize(video.size) }}</p>
                        </div>
                      </template>
                    </a-card-meta>
                  </a-card>
                </a-col>
              </a-row>
            </div>
          </a-tab-pane>

          <!-- 有声PPT标签页 -->
          <a-tab-pane key="ppts" tab="有声PPT">
            <div class="file-list">
              <a-row :gutter="[16, 16]">
                <a-col :xs="24" :sm="12" :md="8" :lg="6" v-for="ppt in pptList" :key="ppt.id">
                  <a-card hoverable class="file-card">
                    <template #cover>
                      <div class="ppt-cover">
                        <img :src="ppt.thumbnail" :alt="ppt.title" />
                        <div class="ppt-slides">{{ ppt.slideCount }}页</div>
                      </div>
                    </template>
                    <template #actions>
                      <a-tooltip title="下载">
                        <download-outlined @click="handleDownload(ppt)" />
                      </a-tooltip>
                      <a-tooltip title="编辑">
                        <edit-outlined @click="handleEdit(ppt)" />
                      </a-tooltip>
                      <a-tooltip title="删除">
                        <delete-outlined @click="handleDelete(ppt)" />
                      </a-tooltip>
                    </template>
                    <a-card-meta :title="ppt.title">
                      <template #description>
                        <div class="file-info">
                          <p>创建时间：{{ formatDate(ppt.createTime) }}</p>
                          <p>文件大小：{{ formatSize(ppt.size) }}</p>
                        </div>
                      </template>
                    </a-card-meta>
                  </a-card>
                </a-col>
              </a-row>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>

    <!-- 确认删除对话框 -->
    <a-modal
      v-model:visible="deleteModalVisible"
      title="确认删除"
      @ok="confirmDelete"
      @cancel="cancelDelete"
      okText="确认"
      cancelText="取消"
    >
      <p>确定要删除该文件吗？此操作不可恢复。</p>
    </a-modal>
  </div>
</template>

<style scoped>
.person-center {
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
}

.file-card {
  transition: all 0.3s;
}

.file-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.video-cover,
.ppt-cover {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 比例 */
  background: #f0f0f0;
  overflow: hidden;
}

.video-cover img,
.ppt-cover img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-duration,
.ppt-slides {
  position: absolute;
  bottom: 8px;
  right: 8px;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.65);
  color: white;
  border-radius: 4px;
  font-size: 12px;
}

.file-info {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

.file-info p {
  margin-bottom: 4px;
}
</style>
