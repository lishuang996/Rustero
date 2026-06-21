import type { StatItem, ProjectItem, PaperItem, TaskItem } from "./types";

export const stats: StatItem[] = [
  {
    title: "科研项目",
    value: 4,
    suffix: "项",
    note: "2 项近期有更新",
    accent: "#1677ff",
  },
  {
    title: "收藏文献",
    value: 128,
    suffix: "篇",
    note: "本周新增 8 篇",
    accent: "#13c2c2",
  },
  {
    title: "待读文献",
    value: 16,
    suffix: "篇",
    note: "3 篇标记为重要",
    accent: "#722ed1",
  },
  {
    title: "知识条目",
    value: 326,
    suffix: "条",
    note: "覆盖 42 个主题",
    accent: "#d89614",
  },
];

export const projects: ProjectItem[] = [
  {
    title: "图神经网络在交通预测中的应用",
    kind: "重点项目",
    status: "活跃",
    update: "今天更新",
    members: ["DX", "HY", "LW"],
    color: "blue",
  },
  {
    title: "多模态科研知识图谱构建",
    kind: "创新训练",
    status: "资料整理",
    update: "昨天更新",
    members: ["DX", "ZY"],
    color: "cyan",
  },
  {
    title: "短视频使用对注意力与记忆的影响",
    kind: "调研项目",
    status: "撰写中",
    update: "3 天前更新",
    members: ["DX", "YH"],
    color: "purple",
  },
];

export const papers: PaperItem[] = [
  {
    title: "Graph Neural Networks: Methods and Applications",
    source: "IEEE TPAMI",
    year: 2025,
    tags: ["GNN", "综述", "待读"],
    authors: [
      "Jie Zhou",
      "Ganqu Cui",
      "Zhengyan Zhang",
      "Cheng Yang",
      "Zhiyuan Liu",
      "Maosong Sun",
    ],
    summary:
      "全面综述图神经网络在不同领域的应用，包括节点分类、链接预测和图生成等任务，并讨论了未来的研究方向与挑战。",
    pdfUrl: "https://example.com/papers/gnn_survey_2025.pdf",
    entryType: "journal",
    publishDate: "2025-02-15",
    doi: "10.1109/TPAMI.2025.1234567",
  },
  {
    title: "A Survey on Multimodal Knowledge Graphs",
    source: "ACM Computing Surveys",
    year: 2024,
    tags: ["知识图谱", "多模态", "已精读"],
    authors: ["Xiang Wang", "Tao Yang", "Wei Hu"],
    summary:
      "系统梳理了多模态知识图谱的构建方法、表示学习技术以及下游应用场景，涵盖文本、图像、视频等多模态信息的融合策略。",
    pdfUrl: "https://example.com/papers/mkg_survey_2024.pdf",
    entryType: "journal",
    publishDate: "2024-09-10",
    doi: "10.1145/3587654.1234567",
  },
  {
    title: "Spatio-Temporal Graph Learning for Traffic Forecasting",
    source: "NeurIPS",
    year: 2025,
    tags: ["交通预测", "时空图", "笔记 6"],
    authors: ["Bing Yu", "Haoteng Yin", "Zhanxing Zhu"],
    summary:
      "提出一种新型时空图卷积网络，有效捕捉交通路网中的时空依赖关系，在多个真实数据集上取得SOTA性能。",
    pdfUrl: "https://example.com/papers/stgcn_traffic_2025.pdf",
    entryType: "conference",
    publishDate: "2025-12-03",
    doi: "10.5555/neurips.2025.5678",
  },
];

export const mockTasks: TaskItem[] = [
  { title: "整理 GNN 相关工作", time: "今天 18:00", done: true },
  { title: "筛选交通预测基准文献", time: "明天", done: false },
  { title: "撰写方法章节初稿", time: "6 月 25 日", done: false },
];
