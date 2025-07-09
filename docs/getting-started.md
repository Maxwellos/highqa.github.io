# 快速开始

欢迎使用 PandaTest 云真机测试平台！本指南将帮助您快速上手并开始使用我们的平台。

## 环境要求

在开始之前，请确保您的开发环境满足以下要求：

- **Node.js**: 18.x 或 20.x（Vite 5 不支持更低版本）
- **包管理器**: npm、yarn 或 pnpm（推荐使用 pnpm）
- **浏览器**: Chrome 90+、Firefox 88+、Safari 14+、Edge 90+

## 安装步骤

### 1. 克隆项目

```bash
git clone https://github.com/PandaTest/pandatest.github.io.git
cd pandatest.github.io
```

### 2. 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm（推荐）
pnpm install
```

### 3. 启动开发服务器

```bash
# 启动文档开发服务器
npm run dev
# 或
yarn dev
# 或
pnpm run dev
```

### 4. 构建生产版本

```bash
# 构建生产版本
npm run build
# 或
yarn build
# 或
pnpm run build
```

## 下一步

- 📖 [安装部署](/getting-started/installation) - 详细的安装和部署指南
- ⚙️ [基础配置](/getting-started/configuration) - 平台配置说明
- 🔧 [本地开发](/getting-started/development) - 开发环境搭建
- 🚀 [功能介绍](/tutorials/core-features/device-management) - 了解平台核心功能

## 📋 环境要求

在开始之前，请确保您的开发环境满足以下要求：

### 系统要求
- **操作系统**: Windows 10+、macOS 10.14+、Linux (Ubuntu 18.04+ 或等效系统)

::: tip 提示
推荐使用 pnpm 作为包管理器，它提供更快的安装速度和更好的依赖管理。
:::

## 🚀 安装部署

### 1. 克隆项目

```bash
# 使用 HTTPS
git clone https://github.com/PandaTest/pandatest.github.io.git

# 或使用 SSH
git clone git@github.com:PandaTest/pandatest.github.io.git

# 进入项目目录
cd pandatest.github.io
```

### 2. 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 3. 启动开发服务器

```bash
# 使用 pnpm
pnpm run dev

# 或使用 npm
npm run dev

# 或使用 yarn
yarn dev
```

启动成功后，您将看到类似以下输出：

```
  Local:   http://localhost:3000/
  Network: http://192.168.1.100:3000/
```

### 4. 访问应用

打开浏览器访问 `http://localhost:3000`，您将看到 PandaTest 的主界面。

## ⚙️ 基础配置

### 环境变量配置

在项目根目录创建 `.env.local` 文件：

```env
# API 基础地址
VITE_API_BASE_URL=http://localhost:8080

# WebSocket 地址
VITE_WS_BASE_URL=ws://localhost:8080

# 应用标题
VITE_APP_TITLE=PandaTest

# 启用调试模式
VITE_DEBUG=true
```

### 主题配置

您可以在 `src/plugins/vuetify.ts` 中自定义主题：

```typescript
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      },
      dark: {
        colors: {
          primary: '#2196F3',
          secondary: '#424242',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})
```

## 📱 第一次使用

### 1. 连接设备

1. 确保您的 Android 设备已开启 USB 调试模式
2. 使用 USB 线连接设备到计算机
3. 在设备管理页面查看连接的设备

### 2. 设备远程控制

1. 点击设备列表中的 "远程控制" 按钮
2. 等待设备连接并加载屏幕
3. 您现在可以通过 Web 界面控制设备

### 3. 开始测试

1. 创建新的测试套件
2. 选择测试设备和应用
3. 配置测试参数
4. 执行测试并查看结果

## 🔧 开发模式

### 热重载开发

```bash
# 启动开发服务器（支持热重载）
pnpm run dev
```

### 类型检查

```bash
# 运行 TypeScript 类型检查
pnpm run type-check
```

### 代码检查

```bash
# 运行 ESLint 检查
pnpm run lint

# 自动修复代码风格问题
pnpm run lint:fix
```

### 构建生产版本

```bash
# 构建生产版本
pnpm run build

# 预览构建结果
pnpm run preview
```

## 🐛 常见问题

### Q: 启动时报错 "Node.js version not supported"

**A:** 请确保使用 Node.js 18.x 或 20.x 版本。您可以使用 nvm 切换版本：

```bash
# 安装并使用 Node.js 18
nvm install 18
nvm use 18

# 或使用 Node.js 20
nvm install 20
nvm use 20
```

### Q: 设备连接失败

**A:** 请检查以下几点：
- 确保设备已开启 USB 调试模式
- 检查 USB 连接是否正常
- 确认设备已被 ADB 识别
- 查看控制台是否有错误信息

### Q: 页面样式显示异常

**A:** 请尝试以下解决方案：
- 清除浏览器缓存
- 检查 Vuetify 依赖是否正确安装
- 确认 CSS 文件是否正确加载

### Q: WebSocket 连接失败

**A:** 请检查：
- 后端服务是否正常运行
- WebSocket 地址配置是否正确
- 防火墙是否阻止了连接
- 网络代理设置是否影响连接

## 📚 下一步

恭喜您成功启动了 PandaTest 平台！接下来您可以：

- 📖 阅读 [功能介绍](/tutorials/core-features/device-management) 了解更多功能
- 🔧 查看 [开发指南](/development/architecture) 学习如何扩展平台
- 💬 加入我们的技术交流群获取支持
- 🐛 在 [GitHub Issues](https://github.com/PandaTest/pandatest.github.io/issues) 反馈问题

## 🆘 获取帮助

如果您在使用过程中遇到问题，可以通过以下方式获取帮助：

- 📋 查看 [常见问题解答](/faq)
- 📧 发送邮件到 support@pandatest.com
- 💬 加入 QQ 群：123456789
- 🐛 在 GitHub 上提交 [Issue](https://github.com/PandaTest/pandatest.github.io/issues)

---

::: tip 💡 小贴士
建议先在测试环境中熟悉平台功能，然后再部署到生产环境使用。
:::

准备好开始您的云真机测试之旅了吗？让我们继续探索 PandaTest 的强大功能！ 