<script setup lang="ts">
import { theme } from "ant-design-vue";
import { computed, ref, watch } from "vue";
import ResearchHome from "./views/ResearchHome.vue";

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

watch(isDark, (value) => localStorage.setItem("rustero-theme", value ? "dark" : "light"));
</script>

<template>
    <a-config-provider :theme="appTheme">
        <ResearchHome :dark="isDark" @toggle-theme="isDark = !isDark" />
    </a-config-provider>
</template>
