<script setup lang="ts">
import { theme } from "ant-design-vue";
import { computed, ref, watch } from "vue";
import AppHeader from "./components/AppHeader.vue";

const isDark = ref(localStorage.getItem("rustero-theme") !== "light");

const appTheme = computed(() => ({
  algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: "#1677ff",
    colorInfo: "#1677ff",
    colorSuccess: "#49aa19",
    colorWarning: "#d89614",
    colorBgBase: isDark.value ? "#080b12" : "#f5f7fa",
    borderRadius: 10,
    wireframe: false,
  },
  components: {
    Layout: {
      headerBg: isDark.value ? "#10141d" : "#ffffff",
      bodyBg: isDark.value ? "#080b12" : "#f5f7fa",
    },
    Card: {
      colorBgContainer: isDark.value ? "#111620" : "#ffffff",
    },
  },
}));

watch(isDark, (value) =>
  localStorage.setItem("rustero-theme", value ? "dark" : "light"),
);
</script>

<template>
  <a-config-provider :theme="appTheme">
    <a-layout :class="['research-layout', { 'light-mode': !isDark }]">
      <AppHeader :dark="isDark" @toggle-theme="isDark = !isDark" />
      <a-layout-content class="page-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}
body {
  overflow: hidden;
}
* {
  box-sizing: border-box;
}
</style>

<style scoped>
.research-layout {
  --page-bg: #080b12;
  --title: #f0f3f8;
  --muted: #7f8b9b;
  --panel-border: #252c39;
  --project-border: #292f3b;
  --project-bg: #0d1119;
  --project-title: #dce3ed;
  --paper-title: #cfd6e0;
  --quick-text: #d7dee8;
  --quick-icon: #11294b;
  --task-text: #cdd5df;
  --task-done: #667181;
  --assistant-start: #111d31;
  --assistant-end: #151327;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  min-height: 100%;
  height: 100%;
  overflow: auto;
  background:
    radial-gradient(
      circle at 78% 0,
      rgba(22, 119, 255, 0.1),
      transparent 460px
    ),
    var(--page-bg);
  transition: background-color 0.2s ease;
}
.research-layout.light-mode {
  --page-bg: #f5f7fa;
  --title: #182230;
  --muted: #667085;
  --panel-border: #e4e7ec;
  --project-border: #e4e7ec;
  --project-bg: #fafbfc;
  --project-title: #27364a;
  --paper-title: #27364a;
  --quick-text: #27364a;
  --quick-icon: #e6f4ff;
  --task-text: #344054;
  --task-done: #98a2b3;
  --assistant-start: #e6f4ff;
  --assistant-end: #f4ebff;
}
.page-content {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 28px 36px;
}
@media (max-width: 760px) {
  .page-content {
    padding: 18px 14px 28px;
  }
}
</style>
