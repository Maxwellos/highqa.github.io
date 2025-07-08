# GitHub Pages 部署指南

本文档详细介绍如何将 High QA 文档站点部署到 GitHub Pages。

## 📋 部署概述

High QA 文档站点使用 VitePress 构建，通过 GitHub Actions 自动部署到 GitHub Pages。整个部署过程完全自动化，无需手动操作。

## 🚀 自动部署流程

### 1. 触发条件

部署会在以下情况下自动触发：
- 推送代码到 `main` 分支
- 手动在 GitHub Actions 页面触发

### 2. 部署步骤

1. **检出代码**：获取最新的代码
2. **设置环境**：安装 Node.js 20.x
3. **安装依赖**：运行 `npm ci` 安装项目依赖
4. **构建项目**：运行 `npm run build` 构建静态文件
5. **上传构建产物**：将构建结果上传到 GitHub Pages
6. **部署**：将文件部署到 GitHub Pages 服务

### 3. 构建产物

- **构建目录**：`docs/.vitepress/dist`
- **静态文件**：包含所有 HTML、CSS、JS 和资源文件
- **访问地址**：`https://Maxwellos.github.io`

## ⚙️ 配置文件说明

### GitHub Actions 工作流

**文件位置**：`.github/workflows/deploy.yml`

```yaml
name: Deploy VitePress site to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build with VitePress
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### VitePress 配置

**文件位置**：`docs/.vitepress/config.ts`

关键配置项：
- `base: '/'` - 因为使用的是用户站点（Maxwellos.github.io）
- `outDir: 'dist'` - 构建输出目录
- `cleanUrls: true` - 生成干净的 URL

## 📝 部署前检查清单

在推送代码前，请确保：

- [ ] 所有文档内容已更新
- [ ] 图片和资源文件路径正确
- [ ] 本地构建测试通过
- [ ] 内链和外链都能正常工作
- [ ] 导航和侧边栏配置正确

## 🔧 本地测试

在推送到 GitHub 之前，建议先进行本地测试：

```bash
# 安装依赖
npm install

# 开发模式（实时预览）
npm run dev

# 构建测试
npm run build

# 预览构建结果
npm run preview
```

## 🐛 常见问题解决

### 1. 构建失败

**问题**：GitHub Actions 构建失败
**解决方案**：
- 检查 Node.js 版本兼容性
- 确认所有依赖都在 `package.json` 中声明
- 查看构建日志定位具体错误

### 2. 页面无法访问

**问题**：部署成功但页面显示 404
**解决方案**：
- 检查 GitHub Pages 设置是否正确
- 确认 `base` 配置是否正确
- 等待 DNS 传播（可能需要几分钟）

### 3. 样式或图片丢失

**问题**：页面显示但样式或图片加载失败
**解决方案**：
- 检查资源文件路径是否正确
- 确认文件已包含在构建产物中
- 检查大小写敏感性问题

### 4. 部署权限问题

**问题**：部署时出现权限错误
**解决方案**：
- 确认 GitHub Pages 已启用
- 检查仓库的 Actions 权限设置
- 确认工作流文件中的权限配置正确

## 📊 监控部署状态

### 查看部署状态

1. 访问 GitHub 仓库的 "Actions" 选项卡
2. 查看最新的工作流运行状态
3. 点击具体的运行记录查看详细日志

### 部署成功指标

- ✅ 构建步骤全部成功
- ✅ 文件成功上传到 GitHub Pages
- ✅ 部署环境显示绿色状态
- ✅ 网站可以正常访问

## 📈 性能优化建议

### 1. 构建优化

- 使用 `npm ci` 而不是 `npm install`
- 启用构建缓存
- 压缩图片资源

### 2. 部署优化

- 使用 CDN 加速静态资源
- 启用 GZIP 压缩
- 配置合适的缓存策略

### 3. 监控优化

- 设置构建失败通知
- 监控部署时间
- 定期检查死链接

## 🔗 相关链接

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [VitePress 官方文档](https://vitepress.dev/)
- [GitHub Actions 官方文档](https://docs.github.com/en/actions)

---

如果在部署过程中遇到问题，请查看 GitHub Actions 的运行日志，或联系开发团队寻求帮助。 