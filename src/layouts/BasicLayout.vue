<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader></GlobalHeader>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<style scoped>
#basicLayout .header {
  background-color: #f6f3f3;
  padding-inline: 16px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  margin-bottom: 20px;
}

#basicLayout .content {
  padding: 20px;
  background: linear-gradient(90deg, #fefefe, #f0f0f0);
  margin-bottom: 32px;
}

#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
