import type { StatItem, ProjectItem, PaperItem, TaskItem } from "./types";

export const stats: StatItem[] = [
  { title: "科研项目", value: 4, suffix: "项", note: "2 项近期有更新", accent: "#1677ff" },
  { title: "收藏文献", value: 128, suffix: "篇", note: "本周新增 8 篇", accent: "#13c2c2" },
  { title: "待读文献", value: 16, suffix: "篇", note: "3 篇标记为重要", accent: "#722ed1" },
  { title: "知识条目", value: 326, suffix: "条", note: "覆盖 42 个主题", accent: "#d89614" },
];

export const projects: ProjectItem[] = [
  { title: "图神经网络在交通预测中的应用", kind: "重点项目", status: "活跃", update: "今天更新", members: ["DX", "HY", "LW"], color: "blue" },
  { title: "多模态科研知识图谱构建", kind: "创新训练", status: "资料整理", update: "昨天更新", members: ["DX", "ZY"], color: "cyan" },
  { title: "短视频使用对注意力与记忆的影响", kind: "调研项目", status: "撰写中", update: "3 天前更新", members: ["DX", "YH"], color: "purple" },
];

export const papers: PaperItem[] = [
  { title: "Graph Neural Networks: Methods and Applications", source: "IEEE TPAMI", year: 2025, tag: "待读" },
  { title: "A Survey on Multimodal Knowledge Graphs", source: "ACM Computing Surveys", year: 2024, tag: "已精读" },
  { title: "Spatio-Temporal Graph Learning for Traffic Forecasting", source: "NeurIPS", year: 2025, tag: "笔记 6" },
];

export const mockTasks: TaskItem[] = [
  { title: "整理 GNN 相关工作", time: "今天 18:00", done: true },
  { title: "筛选交通预测基准文献", time: "明天", done: false },
  { title: "撰写方法章节初稿", time: "6 月 25 日", done: false },
];
