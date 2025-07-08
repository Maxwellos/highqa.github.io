# High QA 云真机测试平台

<p align="center">
  <img width="200" src="docs/public/logo.png">
</p>

<h1 align="center">
    High QA
<div align="center">

![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Vuetify](https://img.shields.io/badge/Vuetify-3.5.x-1867C0?style=flat-square&logo=vuetify&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![VitePress](https://img.shields.io/badge/VitePress-1.x-646CFF?style=flat-square&logo=vite&logoColor=white)

</div>
</h1>

## 📖 项目介绍

High QA 是一个基于 Vue 3 和 Vuetify 3 的**云真机测试平台**，提供 iOS 和 Android 设备的远程访问、控制和管理功能。该平台专为移动应用测试、远程演示和设备管理等场景设计，为开发者和测试工程师提供了高效、便捷的云端测试解决方案。

## ✨ 主要特性

### 🖥️ **设备远程控制**
- **实时屏幕共享**：低延迟、高清晰度的设备屏幕显示
- **触控操作**：支持点击、滑动、长按、多点触控等操作
- **灵活布局**：支持左右和上下分屏布局，可自由调整分屏比例
- **多平台支持**：同时支持 iOS、Android 设备的远程控制

### 📱 **智能设备管理**
- **多维度筛选**：支持按平台、状态、制造商、系统版本等条件筛选
- **设备分组**：支持手动分组、自动分组和混合分组策略
- **状态监控**：实时监控设备连接状态、电量、性能指标
- **批量操作**：支持设备批量重启、配置、测试等操作

### 🚀 **自动化测试**
- **测试套件管理**：完整的测试用例创建和管理流程
- **脚本录制与回放**：支持操作录制和自动化脚本生成
- **多设备并发测试**：同时在多个设备上执行测试任务
- **详细报告**：生成全面的测试执行报告和结果分析

### 📦 **资源管理系统**
- **应用包管理**：支持 APK、IPA、HAP 应用包的上传和管理
- **Agent 节点管理**：统一管理测试代理节点和负载均衡
- **文件管理**：设备文件的上传、下载和管理功能
- **权限控制**：细粒度的用户权限和资源访问控制

### 📊 **性能监控**
- **实时监控**：CPU、内存、网络流量等性能指标监控
- **数据可视化**：使用 ECharts 提供丰富的图表展示
- **历史数据**：性能数据的历史记录和趋势分析
- **预警机制**：异常情况的自动预警和通知

## 🏗️ 技术架构

### 前端技术栈

```
┌─────────────────────────────────────────────┐
│                技术栈                         │
├─────────────────────────────────────────────┤
│ 框架          │ Vue 3 (Composition API)     │
│ 类型检查      │ TypeScript 5.x              │
│ UI 组件库     │ Vuetify 3.5.x               │
│ 状态管理      │ Pinia                       │
│ 路由管理      │ Vue Router 4                │
│ 构建工具      │ Vite 5.x                    │
│ 文档系统      │ VitePress 1.x               │
│ 代码规范      │ ESLint + Prettier           │
│ 测试框架      │ Vitest + Vue Test Utils     │
│ 实时通信      │ WebSocket                   │
│ 数据可视化    │ ECharts                     │
└─────────────────────────────────────────────┘
```

### 架构特点

- **🎯 现代化架构**：采用 Vue 3 Composition API 和 TypeScript
- **📦 模块化设计**：清晰的代码组织和模块划分
- **🔄 响应式状态管理**：基于 Pinia 的集中式状态管理
- **🌐 实时通信**：WebSocket 实现的低延迟实时通信
- **📱 响应式设计**：适配各种设备尺寸和屏幕比例
- **🔧 可扩展性**：插件化架构，易于功能扩展

## 🚀 快速开始

### 环境要求

- **Node.js**: 18.x 或 20.x（Vite 5 不支持更低版本）
- **包管理器**: npm、yarn 或 pnpm（推荐使用 pnpm）
- **浏览器**: Chrome 90+、Firefox 88+、Safari 14+、Edge 90+

### 安装部署

```bash
# 克隆仓库
git clone https://github.com/Maxwellos/highqa.github.io.git

# 进入项目目录
cd highqa.github.io

# 安装依赖（推荐使用 pnpm）
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build

# 启动文档服务器
pnpm run docs:dev
```

### GitHub Pages 部署

本项目已配置 GitHub Actions 自动部署到 GitHub Pages：

1. **自动部署**：推送到 `main` 分支时自动触发部署
2. **手动部署**：在 GitHub Actions 页面手动触发部署
3. **访问地址**：部署成功后可通过 `https://Maxwellos.github.io` 访问

#### 部署配置说明

- **工作流文件**：`.github/workflows/deploy.yml`
- **构建产物路径**：`docs/.vitepress/dist`
- **Node.js 版本**：20.x
- **部署环境**：github-pages

#### 本地预览构建结果

```bash
# 构建文档
npm run build

# 预览构建结果
npm run preview
```

### 配置环境变量

在项目根目录创建 `.env.local` 文件：

```env
# API 基础地址
VITE_API_BASE_URL=http://localhost:8080

# WebSocket 地址
VITE_WS_BASE_URL=ws://localhost:8080

# 应用标题
VITE_APP_TITLE=High QA

# 启用调试模式
VITE_DEBUG=true
```

## 📸 界面截图

### 设备管理界面
<p align="center">
  <img src="docs/public/screenshots/device-management.png" alt="设备管理界面">
</p>

### 远程控制界面
<p align="center">
  <img src="docs/public/screenshots/remote-control.png" alt="远程控制界面">
</p>

### 仪表盘界面
<p align="center">
  <img src="docs/public/screenshots/dashboard.png" alt="仪表盘界面">
</p>

## 📁 项目结构

```
.
├── docs/                           # VitePress 文档
│   ├── .vitepress/                # VitePress 配置
│   │   ├── config.ts              # 站点配置
│   │   └── theme/                 # 自定义主题
│   │       ├── index.js           # 主题入口
│   │       └── style.css          # 自定义样式
│   ├── assets/                    # 资源文件（构建时处理）
│   │   ├── images/                # 图片资源
│   │   ├── videos/                # 视频资源
│   │   ├── icons/                 # 图标资源
│   │   ├── documents/             # 文档资源
│   │   └── data/                  # 数据文件
│   ├── public/                    # 静态文件（直接复制）
│   │   ├── favicon.ico            # 网站图标
│   │   └── logo.png               # 网站Logo
│   ├── features/                  # 功能介绍文档
│   ├── development/               # 开发指南文档
│   └── index.md                   # 文档首页
├── src/                           # 源代码目录
│   ├── api/                       # API 接口定义
│   ├── components/                # 通用组件
│   ├── hooks/                     # 自定义 Hooks
│   ├── store/                     # Pinia 状态管理
│   ├── types/                     # TypeScript 类型定义
│   ├── utils/                     # 工具函数
│   ├── views/                     # 页面组件
│   └── App.vue                    # 根组件
├── public/                        # 静态资源
├── package.json                   # 项目配置
├── vite.config.ts                # Vite 配置
└── README.md                      # 项目说明
```

## 🎨 资源文件管理

### assets/ 目录
用于存放需要经过构建处理的资源文件：
- 支持文件名哈希（缓存优化）
- 可以被 JavaScript/CSS 导入
- 经过 Vite 构建处理

### public/ 目录
用于存放静态资源文件：
- 直接复制到网站根目录
- 不经过构建处理
- 适合存放 favicon、robots.txt 等

## 🔧 核心功能

### 设备远程控制

```typescript
// 设备连接示例
import { useUdtAgent } from '@/hooks/useUdtAgent'

const { connectAgent, createWebSocketConnection } = useUdtAgent()

// 连接设备
await connectAgent({
  host: 'agent.example.com',
  port: 8080,
  udid: 'device-udid-123'
})

// 创建 WebSocket 连接
const wsConnection = createWebSocketConnection('/video', 'video-stream')
```

### 设备分组管理

```typescript
// 设备分组示例
import { useDeviceGroupStore } from '@/store/modules/deviceGroup'

const deviceGroupStore = useDeviceGroupStore()

// 创建设备分组
await deviceGroupStore.createGroup({
  name: '高端Android设备',
  type: 'auto',
  rules: [
    { field: 'platform', operator: 'equals', value: 'android' },
    { field: 'price_range', operator: 'gte', value: 3000 }
  ]
})
```

### 性能监控

```vue
<template>
  <div class="performance-monitor">
    <div ref="chartContainer" class="chart-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { useUdtAgent } from '@/hooks/useUdtAgent'

const chartContainer = ref()
const { createWebSocketConnection } = useUdtAgent()

onMounted(() => {
  const chart = echarts.init(chartContainer.value)
  const ws = createWebSocketConnection('/performance', 'performance-monitor')
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    chart.setOption({
      xAxis: { data: data.timestamps },
      series: [{ data: data.cpu }]
    })
  }
})
</script>
```

## 🎯 应用场景

### 📱 移动应用测试
- **兼容性测试**：在多种设备上验证应用兼容性
- **性能测试**：监控应用在不同设备上的性能表现
- **UI 测试**：验证用户界面在各种屏幕尺寸下的表现
- **自动化测试**：执行回归测试和持续集成测试

### 🎥 远程演示
- **产品演示**：向客户展示移动应用功能
- **培训支持**：远程培训和技术支持
- **协作开发**：团队成员之间的远程协作
- **质量验收**：远程验收和审查工作

### 🔧 设备管理
- **资源调度**：智能分配设备资源
- **状态监控**：实时监控设备运行状态
- **维护管理**：设备维护和故障处理
- **使用统计**：设备使用情况分析

## 📚 文档

完整的文档请访问：[High QA 官方文档](https://Maxwellos.github.io/)

- 📖 [快速开始](https://Maxwellos.github.io/getting-started)
- 🔧 [功能介绍](https://Maxwellos.github.io/features/)
- 👨‍💻 [开发指南](https://Maxwellos.github.io/development/)
- 📊 [API 文档](https://Maxwellos.github.io/development/api)

### 文档开发

```bash
# 安装文档依赖
cd docs && npm install

# 启动文档开发服务器
npm run dev

# 构建文档
npm run build

# 预览构建结果
npm run preview
```

## 🧪 测试

### 运行测试

```bash
# 运行单元测试
pnpm run test

# 运行测试并生成覆盖率报告
pnpm run test:coverage

# 运行 E2E 测试
pnpm run test:e2e

# 类型检查
pnpm run type-check

# 代码检查
pnpm run lint

# 自动修复代码风格
pnpm run lint:fix
```

### 测试覆盖率

项目目标是保持 **85%** 以上的测试覆盖率，当前覆盖情况：

- **Statements**: 87.5%
- **Branches**: 83.2%
- **Functions**: 89.1%
- **Lines**: 86.8%

## 🔧 开发规范

### 代码规范

- 使用 **TypeScript** 进行类型检查
- 遵循 **Vue 3 Composition API** 最佳实践
- 使用 **ESLint** 和 **Prettier** 保证代码质量
- 组件命名采用 **PascalCase**
- 文件命名采用 **kebab-case**

### 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
# 功能开发
git commit -m "feat: 添加设备分组管理功能"

# 问题修复
git commit -m "fix: 修复设备连接超时问题"

# 文档更新
git commit -m "docs: 更新API文档"

# 代码重构
git commit -m "refactor: 重构设备状态管理逻辑"
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！请阅读我们的 [贡献指南](CONTRIBUTING.md) 了解详情。

### 参与贡献的方式

1. **🐛 报告问题**：发现 bug 或提出改进建议
2. **💻 代码贡献**：提交代码修复或新功能
3. **📝 文档改进**：完善文档和示例
4. **🧪 测试覆盖**：增加测试用例
5. **🌐 国际化**：帮助翻译界面和文档

### 开发流程

```bash
# 1. Fork 仓库并克隆到本地
git clone https://github.com/Maxwellos/highqa.github.io.git

# 2. 创建功能分支
git checkout -b feature/amazing-feature

# 3. 提交更改
git commit -m "feat: add amazing feature"

# 4. 推送到分支
git push origin feature/amazing-feature

# 5. 创建 Pull Request
```

## 📊 项目状态

### 最新发布

- **版本**: v1.0.0
- **发布日期**: 2024-01-15
- **更新内容**: 首个正式版本发布

### 开发进度

- [x] 设备管理功能
- [x] 远程控制功能
- [x] 自动化测试功能
- [x] 资源管理系统
- [x] 性能监控功能
- [ ] 多租户支持
- [ ] 云部署方案
- [ ] 移动端应用

### 技术债务

- **代码重构**: 部分遗留组件需要重构为 Composition API
- **性能优化**: 大数据量场景下的性能优化
- **测试覆盖**: 增加 E2E 测试覆盖率
- **文档完善**: API 文档和开发指南的完善

## 🌟 贡献者

感谢所有为 High QA 做出贡献的开发者！

<a href="https://github.com/Maxwellos/highqa.github.io/graphs/contributors">
<img src="https://contrib.rocks/image?repo=Maxwellos/highqa.github.io" />
</a>

## 💬 社区支持

### 获取帮助

- **📚 文档**: 查看 [官方文档](https://Maxwellos.github.io/)
- **🐛 问题反馈**: 提交 [GitHub Issue](https://github.com/Maxwellos/highqa.github.io/issues)
- **💬 讨论交流**: 加入 [GitHub Discussions](https://github.com/Maxwellos/highqa.github.io/discussions)
- **📧 邮件支持**: support@highqa.com

### 交流群组

- **QQ 群**: 123456789
- **微信群**: 扫描二维码加入
- **Discord**: [High QA Community](https://discord.gg/highqa)

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE) - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vuetify](https://vuetifyjs.com/) - Material Design 组件库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [ECharts](https://echarts.apache.org/) - 数据可视化库

---

<div align="center">

**🚀 立即体验 High QA 云真机测试平台！**

[在线演示](https://demo.highqa.com) | [查看文档](https://Maxwellos.github.io/) | [下载源码](https://github.com/Maxwellos/highqa.github.io)

**如果这个项目对你有帮助，请给我们一个 ⭐️ Star！**

</div> 