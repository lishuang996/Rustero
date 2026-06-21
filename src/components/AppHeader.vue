<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  BulbFilled,
  BulbOutlined,
  NotificationOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";

defineProps<{ dark: boolean }>();
const emit = defineEmits<{ toggleTheme: [] }>();

const route = useRoute();
const router = useRouter();

const current = computed(() => [route.path]);

const menuItems: MenuProps["items"] = [
  { key: "/workspace", label: "科研工作台" },
  { key: "/projects", label: "科研项目" },
  { key: "/papers", label: "文献管理" },
  { key: "/knowledge", label: "知识图谱" },
  { key: "/assistant", label: "科研助手" },
];

function onSelect(info: { key: string }) {
  router.push(info.key);
}
</script>

<template>
  <a-layout-header class="app-header">
    <div class="brand">
      <img src="/rustero-icon.png" alt="Rustero" />
      <strong>Rustero</strong>
    </div>

    <a-menu
      v-model:selected-keys="current"
      mode="horizontal"
      :items="menuItems"
      class="app-nav"
      @select="onSelect"
    />

    <a-space :size="8">
      <a-button type="text" shape="circle" aria-label="搜索">
        <SearchOutlined />
      </a-button>
      <a-button
        type="text"
        shape="circle"
        :aria-label="dark ? '切换到亮色主题' : '切换到暗色主题'"
        @click="emit('toggleTheme')"
      >
        <BulbFilled v-if="dark" />
        <BulbOutlined v-else />
      </a-button>
      <a-badge dot>
        <a-button type="text" shape="circle" aria-label="通知">
          <NotificationOutlined />
        </a-button>
      </a-badge>
      <a-avatar class="user-avatar">DX</a-avatar>
    </a-space>
  </a-layout-header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  border-bottom: 1px solid var(--border);
  background: var(--header-bg) !important;
  backdrop-filter: blur(18px);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.brand {
  min-width: 150px;
  display: flex;
  align-items: center;
  gap: 11px;
}
.brand img {
  width: 38px;
  height: auto;
  aspect-ratio: 1;
  object-fit: contain;
  flex: none;
}
.brand strong {
  color: var(--brand);
  font-size: 19px;
  font-weight: 500;
  line-height: 1;
}

.app-nav {
  flex: 1;
  background: transparent;
  border-bottom: none;
}
.app-nav :deep(.ant-menu-item) {
  color: var(--nav);
}
.app-nav :deep(.ant-menu-item-selected) {
  color: var(--nav-active);
}

.user-avatar {
  color: #fff;
  background: #1677ff;
  font-weight: 600;
}

@media (max-width: 1080px) {
  .app-nav :deep(.ant-menu-item) {
    padding-inline: 8px;
  }
}

@media (max-width: 760px) {
  .app-header {
    padding: 0 14px;
  }
  .brand {
    flex: 1;
  }
  .app-nav {
    display: none;
  }
}
</style>
