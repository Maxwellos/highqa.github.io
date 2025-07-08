# 本地开发

本指南将帮助您在本地环境中开发和调试 High QA 云真机测试平台。

## 开发环境准备

### 必需工具

```bash
# 检查工具版本
node --version    # 推荐 v18.x 或 v20.x
npm --version     # 推荐 v8.x+
git --version     # 推荐 v2.x+
```

### 推荐工具

```bash
# 包管理器
npm install -g pnpm

# 代码编辑器扩展（VS Code）
code --install-extension Vue.volar
code --install-extension Vue.vscode-typescript-vue-plugin
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
```

## 项目启动

### 克隆并启动

```bash
# 克隆项目
git clone https://github.com/Maxwellos/highqa.github.io.git
cd highqa.github.io

# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev
```

### 验证启动

```bash
# 检查服务状态
curl http://localhost:5173

# 查看进程
ps aux | grep vitepress
```

## 开发工作流

### 目录结构

```
highqa.github.io/
├── docs/                    # 文档源文件
│   ├── .vitepress/         # VitePress 配置
│   │   ├── config.ts       # 主配置文件
│   │   ├── theme/          # 主题文件
│   │   └── cache/          # 缓存文件
│   ├── features/           # 功能介绍
│   ├── development/        # 开发指南
│   ├── getting-started/    # 快速开始
│   ├── public/             # 静态资源
│   └── index.md            # 首页
├── scripts/                # 构建脚本
├── package.json            # 项目配置
├── .env.example            # 环境变量示例
└── README.md               # 项目说明
```

### 文件命名规范

```bash
# 页面文件
feature-name.md           # 功能介绍页面
getting-started.md        # 指南页面
api-reference.md          # API 参考

# 图片资源
feature-screenshot.png    # 功能截图
architecture-diagram.svg  # 架构图
logo.png                  # Logo 文件

# 配置文件
config.ts                 # TypeScript 配置
config.js                 # JavaScript 配置
```

## 开发规范

### Markdown 写作规范

```markdown
# 一级标题（每个文档只有一个）

## 二级标题（主要章节）

### 三级标题（子章节）

#### 四级标题（详细内容）

# 代码块
```typescript
// 代码示例
const example = 'Hello World'
```

# 引用
> 这是一个引用示例

# 列表
- 无序列表项
- 无序列表项

1. 有序列表项
2. 有序列表项

# 链接
[链接文本](链接地址)

# 图片
![图片描述](/logo.png)

# 表格
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 值1 | 值2 | 值3 |

# 警告框
::: tip 提示
这是一个提示
:::

::: warning 警告
这是一个警告
:::

::: danger 危险
这是一个危险提示
:::
```

### 代码风格指南

```typescript
// TypeScript 代码风格
interface UserConfig {
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
}

// 函数命名：使用 camelCase
const getUserInfo = (userId: string): UserConfig => {
  // 实现逻辑
}

// 常量命名：使用 UPPER_CASE
const DEFAULT_TIMEOUT = 5000
const API_BASE_URL = 'https://api.example.com'

// 类命名：使用 PascalCase
class UserService {
  private readonly apiUrl: string
  
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }
  
  async getUser(id: string): Promise<UserConfig> {
    // 实现逻辑
  }
}
```

### 文档结构规范

```markdown
# 页面标题

## 概述
简要介绍本页面的内容和目的

## 功能特性
- 特性1：详细描述
- 特性2：详细描述
- 特性3：详细描述

## 使用说明
### 基础用法
详细的使用步骤和示例

### 高级用法
高级功能的使用方法

## 配置参数
| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| param1 | string | 'default' | 参数描述 |

## 代码示例
```typescript
// 完整的代码示例
const example = new Example({
  param1: 'value1',
  param2: 'value2'
})
```

## API 参考
### 方法列表
- `method1()`: 方法描述
- `method2()`: 方法描述

## 常见问题
### Q: 问题描述？
A: 问题解答

## 相关链接
- [相关文档1](链接地址)
- [相关文档2](链接地址)
```

## 调试技巧

### 开发服务器调试

```bash
# 启动详细日志模式
DEBUG=vitepress:* pnpm run dev

# 指定端口启动
pnpm run dev --port 3000

# 指定主机启动
pnpm run dev --host 0.0.0.0
```

### 构建调试

```bash
# 构建详细信息
pnpm run build --debug

# 分析构建结果
pnpm run build --analyze

# 预览构建结果
pnpm run preview
```

### 配置调试

```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  // 开启调试模式
  debug: true,
  
  // 详细日志
  logLevel: 'info',
  
  // 开发服务器配置
  server: {
    port: 5173,
    host: '0.0.0.0',
    open: true,
    // 启用 CORS
    cors: true,
    // 代理配置
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

## 性能优化

### 开发性能

```bash
# 使用 pnpm 提高安装速度
pnpm config set registry https://registry.npmmirror.com

# 启用缓存
pnpm config set store-dir ~/.pnpm-store

# 并行安装
pnpm install --parallel
```

### 构建性能

```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  build: {
    // 关闭源码映射（生产环境）
    sourcemap: false,
    
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue'],
          vendor: ['vue-router'],
          utils: ['lodash', 'axios']
        }
      }
    },
    
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
```

## 热重载配置

### 自动重载

```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  // 监听文件变化
  server: {
    watch: {
      usePolling: true,
      interval: 1000
    }
  },
  
  // 自动重启
  restart: {
    include: [
      'docs/.vitepress/config.ts',
      'docs/.vitepress/theme/**'
    ]
  }
})
```

### 自定义热重载

```javascript
// scripts/dev-server.js
const { spawn } = require('child_process')
const chokidar = require('chokidar')

// 启动开发服务器
let server = spawn('pnpm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
})

// 监听配置文件变化
chokidar.watch('docs/.vitepress/config.ts').on('change', () => {
  console.log('配置文件变化，重启服务器...')
  server.kill()
  server = spawn('pnpm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  })
})
```

## 多环境开发

### 环境配置

```bash
# 开发环境
cp .env.example .env.development

# 测试环境
cp .env.example .env.test

# 生产环境
cp .env.example .env.production
```

### 环境切换

```bash
# 切换到开发环境
export NODE_ENV=development
pnpm run dev

# 切换到测试环境
export NODE_ENV=test
pnpm run build:test

# 切换到生产环境
export NODE_ENV=production
pnpm run build
```

### 条件配置

```typescript
// docs/.vitepress/config.ts
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'
const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  base: isProd ? '/' : '/dev/',
  
  build: {
    sourcemap: isDev,
    minify: isProd ? 'terser' : false
  },
  
  define: {
    __DEV__: isDev,
    __TEST__: isTest,
    __PROD__: isProd
  }
})
```

## 团队协作

### Git 工作流

```bash
# 创建功能分支
git checkout -b feature/new-feature

# 提交代码
git add .
git commit -m "feat: 添加新功能"

# 推送到远程
git push origin feature/new-feature

# 创建 Pull Request
gh pr create --title "添加新功能" --body "功能描述"
```

### 提交规范

```bash
# 提交类型
feat:     新功能
fix:      修复 bug
docs:     文档更新
style:    代码格式化
refactor: 重构代码
test:     测试相关
chore:    构建过程或辅助工具的变动

# 提交示例
git commit -m "feat: 添加设备管理功能"
git commit -m "fix: 修复页面加载问题"
git commit -m "docs: 更新安装指南"
```

### 代码审查

```bash
# 检查代码风格
pnpm run lint

# 自动修复
pnpm run lint:fix

# 类型检查
pnpm run type-check

# 构建检查
pnpm run build
```

## 测试开发

### 单元测试

```bash
# 运行测试
pnpm run test

# 监听模式
pnpm run test:watch

# 覆盖率报告
pnpm run test:coverage
```

### 集成测试

```bash
# 端到端测试
pnpm run test:e2e

# 可视化测试
pnpm run test:ui
```

### 性能测试

```bash
# 构建性能测试
pnpm run build:analyze

# 运行时性能测试
pnpm run test:performance
```

## 部署准备

### 构建检查

```bash
# 预构建检查
pnpm run pre-build

# 构建项目
pnpm run build

# 验证构建结果
pnpm run preview

# 构建分析
pnpm run build:analyze
```

### 部署脚本

```bash
#!/bin/bash
# deploy.sh

echo "开始部署..."

# 构建项目
pnpm run build

# 检查构建结果
if [ $? -eq 0 ]; then
    echo "构建成功"
else
    echo "构建失败"
    exit 1
fi

# 部署到服务器
rsync -av docs/.vitepress/dist/ user@server:/var/www/highqa-docs/

echo "部署完成"
```

## 故障排除

### 常见问题

```bash
# 依赖问题
rm -rf node_modules package-lock.json
pnpm install

# 缓存问题
pnpm store prune
rm -rf .vitepress/cache

# 端口占用
lsof -ti:5173 | xargs kill -9
pnpm run dev --port 3000

# 内存不足
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm run build
```

### 调试工具

```bash
# 查看详细错误
DEBUG=vitepress:* pnpm run dev

# 检查配置
pnpm run config:check

# 性能分析
pnpm run dev --profile
```

## 开发技巧

### 快速命令

```bash
# 创建新页面
pnpm run new:page <page-name>

# 生成目录
pnpm run generate:toc

# 优化图片
pnpm run optimize:images

# 检查链接
pnpm run check:links
```

### 代码片段

```json
// .vscode/snippets.json
{
  "VitePress Page": {
    "prefix": "vp-page",
    "body": [
      "# ${1:页面标题}",
      "",
      "## 概述",
      "",
      "${2:页面描述}",
      "",
      "## 功能特性",
      "",
      "- ${3:特性1}",
      "- ${4:特性2}",
      "",
      "## 使用说明",
      "",
      "### 基础用法",
      "",
      "```typescript",
      "// ${5:代码示例}",
      "```",
      "",
      "## 相关链接",
      "",
      "- [${6:链接文本}](${7:链接地址})"
    ]
  }
}
```

### 自动化脚本

```javascript
// scripts/new-page.js
const fs = require('fs')
const path = require('path')

const createPage = (name) => {
  const template = `# ${name}

## 概述

这里是 ${name} 的介绍。

## 功能特性

- 特性1
- 特性2

## 使用说明

### 基础用法

\`\`\`typescript
// 代码示例
\`\`\`

## 相关链接

- [相关文档](链接地址)
`

  const fileName = name.toLowerCase().replace(/\s+/g, '-')
  const filePath = path.join('docs', `${fileName}.md`)
  
  fs.writeFileSync(filePath, template)
  console.log(`✅ 页面创建成功: ${filePath}`)
}

// 使用方法: node scripts/new-page.js "页面名称"
const pageName = process.argv[2]
if (pageName) {
  createPage(pageName)
} else {
  console.log('请提供页面名称')
}
```

通过以上开发指南，您可以高效地进行 High QA 平台的本地开发。如果遇到任何问题，请参考 [故障排除](/getting-started/troubleshooting) 或联系我们的技术支持。 