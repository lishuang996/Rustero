<script setup lang="ts">
import { computed, ref } from "vue";
import AppHeader from "../components/AppHeader.vue";
import { stats, projects, papers, mockTasks } from "../ts_scripts/mocks";
import type { TaskItem } from "../ts_scripts/types";

defineProps<{ dark: boolean }>();
defineEmits<{ toggleTheme: [] }>();

const activeNav = ref("科研工作台");
const navItems = ["科研工作台", "科研项目", "文献管理", "知识图谱", "科研助手"];

const tasks = ref<TaskItem[]>(mockTasks);

const finishedTasks = computed(
  () => tasks.value.filter((item) => item.done).length,
);
</script>

<template>
  <a-layout :class="['research-layout', { 'light-mode': !dark }]">
    <AppHeader
      v-model="activeNav"
      :items="navItems"
      :dark="dark"
      @toggle-theme="$emit('toggleTheme')"
    />

    <a-layout-content class="page-content">
      <section class="page-title">
        <a-typography>
          <a-typography-text class="page-label"
          >RESEARCH OVERVIEW</a-typography-text
          >
          <a-typography-title :level="3">科研工作台</a-typography-title>
          <a-typography-paragraph type="secondary">
            集中管理项目、文献与知识，让研究脉络保持清晰。
          </a-typography-paragraph>
        </a-typography>
        <a-space>
          <a-button>导入文献</a-button>
          <a-button type="primary">新建科研项目</a-button>
        </a-space>
      </section>

      <a-row :gutter="[14, 14]" class="stat-row">
        <a-col
          v-for="stat in stats"
          :key="stat.title"
          :xs="24"
          :sm="12"
          :lg="6"
        >
          <a-card class="stat-card" :bordered="true">
            <i :style="{ background: stat.accent }"></i>
            <a-statistic
              :title="stat.title"
              :value="stat.value"
              :suffix="stat.suffix"
            />
            <div class="stat-note">{{ stat.note }}</div>
          </a-card>
        </a-col>
      </a-row>

      <div class="dashboard-grid">
        <div class="main-column">
          <a-card class="panel-card" title="我的科研项目">
            <template #extra>
              <a-button type="link" size="small">查看全部</a-button>
            </template>
            <div class="project-grid">
              <a-card
                v-for="project in projects"
                :key="project.title"
                size="small"
                class="project-card"
              >
                <div class="project-top">
                  <span class="project-kind">{{ project.kind }}</span>
                  <a-tag :color="project.color">{{ project.status }}</a-tag>
                </div>
                <h3>{{ project.title }}</h3>
                <p>{{ project.update }}</p>
                <footer>
                  <a-avatar-group :max-count="3">
                    <a-avatar
                      v-for="member in project.members"
                      :key="member"
                      size="small"
                    >
                      {{ member }}
                    </a-avatar>
                  </a-avatar-group>
                  <a-button type="text" size="small">打开项目 →</a-button>
                </footer>
              </a-card>
            </div>
          </a-card>

          <a-card class="panel-card" title="最近阅读">
            <template #extra>
              <a-button type="primary" size="small">＋ 导入文献</a-button>
            </template>
            <a-list :data-source="papers" item-layout="horizontal">
              <template #renderItem="{ item }">
                <a-list-item class="paper-item">
                  <a-list-item-meta
                    :description="`${item.source} · ${item.year}`"
                  >
                    <template #avatar>
                      <a-avatar shape="square" class="pdf-avatar">PDF</a-avatar>
                    </template>
                    <template #title>
                      <span>{{ item.title }}</span>
                    </template>
                  </a-list-item-meta>
                  <a-tag>{{ item.tag }}</a-tag>
                </a-list-item>
              </template>
            </a-list>
          </a-card>
        </div>

        <aside class="side-column">
          <a-card class="panel-card" title="快捷入口">
            <div class="quick-grid">
              <a-button class="quick-action">
                <b>文</b>
                <span>
                  导入文献
                  <small>PDF / DOI / BibTeX</small>
                </span>
              </a-button>
              <a-button class="quick-action">
                <b>项</b>
                <span>
                  新建项目
                  <small>建立研究空间</small>
                </span>
              </a-button>
              <a-button class="quick-action">
                <b>图</b>
                <span>
                  知识图谱
                  <small>浏览主题关系</small>
                </span>
              </a-button>
              <a-button class="quick-action">
                <b>AI</b>
                <span>
                  科研助手
                  <small>阅读、总结与问答</small>
                </span>
              </a-button>
            </div>
          </a-card>

          <a-card class="panel-card" title="今日待办">
            <template #extra>
              <a-tag color="blue">
                {{ finishedTasks }} / {{ tasks.length }}</a-tag
              >
            </template>
            <div class="task-list">
              <a-checkbox
                v-for="task in tasks"
                :key="task.title"
                v-model:checked="task.done"
                class="task-item"
              >
                <span :class="{ completed: task.done }">
                  <b>{{ task.title }}</b>
                  <small>{{ task.time }}</small>
                </span>
              </a-checkbox>
            </div>
          </a-card>
        </aside>
      </div>
    </a-layout-content>
  </a-layout>
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
      icircle at 78% 0,
      rgba(22, 119, 255, 0.1),
      transparent 460pxi
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
.page-title {
  margin-bottom: 18px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
}
.page-label {
  color: #1677ff;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.7px;
}
.page-title :deep(.ant-typography) {
  margin-bottom: 0;
}
.page-title :deep(.ant-typography h3) {
  color: var(--title);
}
.stat-row {
  margin-bottom: 14px;
}
.stat-card {
  position: relative;
  height: 118px;
  overflow: hidden;
}
.stat-card :deep(.ant-statistic-content-value) {
  font-variant-numeric: tabular-nums;
}
.stat-card > i {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
}
.stat-note {
  margin-top: 5px;
  color: #758196;
  font-size: 14px;
  line-height: 22px;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.75fr) minmax(260px, 0.85fr);
  gap: 16px;
  align-items: start;
}
.main-column,
.side-column {
  display: grid;
  gap: 16px;
}
.panel-card {
  border-color: var(--panel-border);
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 11px;
}
.project-card {
  border-color: var(--project-border);
  background: var(--project-bg);
}
.project-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.project-kind {
  color: var(--muted);
  font-size: 12px;
  line-height: 20px;
}
.project-card h3 {
  min-height: 40px;
  margin: 12px 0 7px;
  color: var(--project-title);
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
}
.project-card p {
  margin: 0 0 13px;
  color: var(--muted);
  font-size: 12px;
  line-height: 20px;
}
.project-card footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.paper-item {
  padding-block: 10px !important;
}
.pdf-avatar {
  color: #ff7875;
  font-size: 12px;
  font-weight: 600;
  background: #451d20;
}
.light-mode .pdf-avatar {
  background: #fff1f0;
}
.paper-item :deep(.ant-list-item-meta-title) {
  margin-bottom: 3px;
  color: var(--paper-title);
  font-size: 14px;
  line-height: 22px;
}
.paper-item :deep(.ant-list-item-meta-description) {
  font-size: 12px;
  line-height: 20px;
}
.quick-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
}
.quick-action {
  height: auto;
  min-height: 72px;
  padding: 10px !important;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 9px;
  text-align: left;
}
.quick-action > b {
  flex: none;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  color: #69b1ff;
  font-size: 14px;
  font-weight: 600;
  background: var(--quick-icon);
}
.quick-action > span {
  min-width: 0;
  display: flex;
  flex-direction: column;
  color: var(--quick-text);
  font-size: 14px;
  line-height: 22px;
}
.quick-action small {
  margin-top: 3px;
  overflow: hidden;
  color: var(--muted);
  font-size: 12px;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.task-list {
  display: grid;
  gap: 3px;
}
.task-item {
  margin: 0 !important;
  padding: 8px 2px;
  align-items: flex-start;
}
.task-item span {
  display: flex;
  flex-direction: column;
}
.task-item b {
  color: var(--task-text);
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
}
.task-item small {
  margin-top: 2px;
  color: var(--muted);
  font-size: 12px;
  line-height: 20px;
}
.task-item .completed b {
  color: var(--task-done);
  text-decoration: line-through;
}
.assistant-card {
  background: linear-gradient(
    135deg,
    var(--assistant-start),
    var(--assistant-end)
  );
}
.assistant-content {
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.assistant-content span {
  display: flex;
  flex-direction: column;
}
.assistant-content small {
  color: #5f9fea;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 1px;
}
.assistant-content b {
  margin-top: 3px;
  color: var(--project-title);
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
}
.ai-avatar {
  color: white;
  font-size: 14px;
  font-weight: 600;
  background: linear-gradient(135deg, #1677ff, #722ed1);
}
@media (max-width: 1080px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
  .dashboard-grid {
    grid-template-columns: minmax(0, 1.5fr) 250px;
  }
}
@media (max-width: 760px) {
  .page-content {
    padding: 18px 14px 28px;
  }
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  .page-title {
    align-items: flex-start;
  }
  .page-title > a-typography + * {
    display: none;
  }
  .side-column {
    grid-template-columns: 1fr 1fr;
  }
  .assistant-card {
    grid-column: 1/-1;
  }
}
@media (max-width: 520px) {
  .side-column,
  .quick-grid {
    grid-template-columns: 1fr;
  }
  .assistant-card {
    grid-column: auto;
  }
}
</style>
