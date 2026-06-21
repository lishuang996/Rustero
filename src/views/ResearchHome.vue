<script setup lang="ts">
import { computed, ref } from "vue";
import { stats, projects, papers, mockTasks } from "../ts_scripts/mocks";
import type { TaskItem } from "../ts_scripts/types";

const tasks = ref<TaskItem[]>(mockTasks);

const finishedTasks = computed(
  () => tasks.value.filter((item) => item.done).length,
);

const quickActions = [
  { icon: "文", label: "导入文献", desc: "PDF / DOI / BibTeX" },
  { icon: "项", label: "新建项目", desc: "建立研究空间" },
  { icon: "图", label: "知识图谱", desc: "浏览主题关系" },
  { icon: "AI", label: "科研助手", desc: "阅读、总结与问答" },
];
</script>

<template>
  <section class="page-title">
    <a-typography>
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
    <a-col v-for="stat in stats" :key="stat.title" :xs="24" :sm="12" :lg="6">
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

  <a-row :gutter="16">
    <a-col :xs="24" :lg="16" class="main-column">
      <a-card class="panel-card" title="我的科研项目">
        <template #extra>
          <a-button type="link" size="small">查看全部</a-button>
        </template>
        <a-row :gutter="[11, 11]">
          <a-col
            v-for="project in projects"
            :key="project.title"
            :xs="24"
            :sm="12"
            :xl="8"
          >
            <a-card size="small" class="project-card">
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
          </a-col>
        </a-row>
      </a-card>

      <a-card class="panel-card" title="最近阅读">
        <template #extra>
          <a-button type="primary" size="small">＋ 导入文献</a-button>
        </template>
        <a-list :data-source="papers" item-layout="horizontal">
          <template #renderItem="{ item }">
            <a-list-item class="paper-item">
              <a-list-item-meta :description="`${item.source} · ${item.year}`">
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
    </a-col>

    <a-col :xs="24" :lg="8" class="side-column">
      <a-card class="panel-card" title="快捷入口">
        <a-row :gutter="[9, 9]">
          <a-col
            v-for="action in quickActions"
            :key="action.label"
            :xs="24"
            :sm="12"
          >
            <a-card hoverable size="small" class="quick-card">
              <div class="quick-card-body">
                <b>{{ action.icon }}</b>
                <span>
                  {{ action.label }}
                  <small>{{ action.desc }}</small>
                </span>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </a-card>

      <a-card class="panel-card" title="今日待办">
        <template #extra>
          <a-tag color="blue"> {{ finishedTasks }} / {{ tasks.length }}</a-tag>
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
    </a-col>
  </a-row>
</template>

<style scoped>
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
.main-column,
.side-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.panel-card {
  border-color: var(--panel-border);
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
.quick-card {
  border-color: var(--panel-border);
}
.quick-card-body {
  display: flex;
  align-items: center;
  gap: 9px;
}
.quick-card-body > b {
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
.quick-card-body > span {
  min-width: 0;
  display: flex;
  flex-direction: column;
  color: var(--quick-text);
  font-size: 14px;
  line-height: 22px;
}
.quick-card-body small {
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
@media (max-width: 760px) {
  .page-title {
    align-items: flex-start;
  }
  .page-title > a-typography + * {
    display: none;
  }
  .assistant-card {
    grid-column: 1/-1;
  }
}
@media (max-width: 520px) {
  .side-column {
    flex-direction: column;
  }
  .assistant-card {
    grid-column: auto;
  }
}
</style>
