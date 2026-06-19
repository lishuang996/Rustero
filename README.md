# Rustero

**Rustero** 是一个 AI 辅助的科研一体化平台，致力于为研究人员提供高效、现代化的文献阅读与写作工作流。通过将人工智能与桌面端原生体验相结合，Rustero 帮助你在一个统一的界面中完成从文献阅读到论文写作的全流程工作。

## ✨ 核心功能

- **📖 智能文献阅读**：支持 PDF 文献导入与高亮标注，AI 辅助摘要生成与关键信息提取，帮助你快速把握论文核心。
- **✍️ AI 辅助写作**：提供论文写作模板、引文管理、语法润色与学术表达优化，让写作更专注于内容本身。
- **🔗 知识互联**：文献间的引用关系可视化，构建个人知识图谱，发现研究脉络与前沿方向。
- **💻 原生桌面体验**：基于 Tauri 构建，轻量、高性能，支持 Windows / macOS / Linux 多平台。

## 🛠️ 技术栈

| 层级 | 技术 |
|------|------|
| 桌面框架 | [Tauri 2](https://tauri.app/) |
| 前端框架 | [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/) |
| UI 组件库 | [Ant Design Vue](https://antdv.com/) |
| 状态管理 | [Pinia](https://pinia.vuejs.org/) |
| 构建工具 | [Vite](https://vite.dev/) |
| 后端引擎 | [Rust](https://www.rust-lang.org/) |
| AI 能力 | 可集成 LLM API（OpenAI / 本地模型等） |

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) >= 18
- [Rust](https://www.rust-lang.org/tools/install) 工具链
- 系统依赖（请参考 [Tauri 官方文档](https://tauri.app/start/prerequisites/)）

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/lishuang996/Rustero.git
cd rustero

# 安装前端依赖
npm install

# 启动开发模式
npm run tauri dev
```

### 构建发布包

```bash
npm run tauri build
```

构建产物将输出到 `src-tauri/target/release/bundle/` 目录。

## 📁 项目结构

```
rustero/
├── index.html              # 入口 HTML
├── package.json             # 前端依赖与脚本
├── vite.config.ts           # Vite 配置
├── tsconfig.json            # TypeScript 配置
├── src/                     # Vue 前端源码
│   ├── main.ts              # 应用入口
│   ├── App.vue              # 根组件
│   └── assets/              # 静态资源
└── src-tauri/               # Rust 后端（Tauri）
    ├── Cargo.toml           # Rust 依赖与元信息
    ├── tauri.conf.json      # Tauri 应用配置
    └── src/
        ├── main.rs          # Rust 入口
        └── lib.rs           # 命令注册与插件初始化
```

## 📝 开发计划

- [x] 项目初始化与基础架构搭建
- [ ] 文献导入与 PDF 阅读器
- [ ] AI 摘要生成与关键信息提取
- [ ] 论文写作编辑器（Markdown / 富文本）
- [ ] 引文管理与 BibTeX 支持
- [ ] 知识图谱可视化
- [ ] 多语言支持（中文 / 英文）

## 📄 许可证

[MIT](LICENSE)
