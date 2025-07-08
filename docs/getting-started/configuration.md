# 基础配置

本指南将帮助您完成 High QA 云真机测试平台的基础配置，包括环境变量、系统设置、用户配置等。

## 配置文件结构

```
highqa.github.io/
├── .env.example              # 环境变量示例
├── .env.local               # 本地环境变量
├── .env.production          # 生产环境变量
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts        # VitePress 配置
│   │   └── theme/           # 主题配置
│   └── public/              # 静态资源
└── package.json             # 项目配置
```

## 环境变量配置

### 创建配置文件

```bash
# 复制示例配置文件
cp .env.example .env.local

# 编辑配置文件
vim .env.local
```

### 基础环境变量

```env
# .env.local

# 应用基础配置
VITE_APP_TITLE=High QA 云真机测试平台
VITE_APP_VERSION=1.0.0
VITE_APP_BASE_URL=http://localhost:5173
VITE_APP_DESCRIPTION=专业的移动设备远程控制和自动化测试解决方案

# API 配置
VITE_API_BASE_URL=http://localhost:8080
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000

# WebSocket 配置
VITE_WS_BASE_URL=ws://localhost:8080
VITE_WS_RECONNECT_INTERVAL=5000
VITE_WS_MAX_RECONNECT_ATTEMPTS=5

# 认证配置
VITE_AUTH_TOKEN_KEY=highqa_token
VITE_AUTH_REFRESH_TOKEN_KEY=highqa_refresh_token
VITE_AUTH_TOKEN_EXPIRE_TIME=7200000

# 调试配置
VITE_DEBUG=true
VITE_LOG_LEVEL=debug

# 第三方服务
VITE_ANALYTICS_ID=
VITE_SENTRY_DSN=
```

### 生产环境配置

```env
# .env.production

# 应用基础配置
VITE_APP_TITLE=High QA
VITE_APP_VERSION=1.0.0
VITE_APP_BASE_URL=https://highqa.com
VITE_APP_DESCRIPTION=云真机测试平台

# API 配置
VITE_API_BASE_URL=https://api.highqa.com
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000

# WebSocket 配置
VITE_WS_BASE_URL=wss://ws.highqa.com
VITE_WS_RECONNECT_INTERVAL=5000
VITE_WS_MAX_RECONNECT_ATTEMPTS=3

# 认证配置
VITE_AUTH_TOKEN_KEY=highqa_token
VITE_AUTH_REFRESH_TOKEN_KEY=highqa_refresh_token
VITE_AUTH_TOKEN_EXPIRE_TIME=7200000

# 调试配置
VITE_DEBUG=false
VITE_LOG_LEVEL=error

# 第三方服务
VITE_ANALYTICS_ID=GA_TRACKING_ID
VITE_SENTRY_DSN=SENTRY_DSN_URL
```

## VitePress 配置

### 基础配置

```typescript
// docs/.vitepress/config.ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 基础信息
  title: 'High QA',
  description: '云真机测试平台官方文档',
  lang: 'zh-CN',
  
  // 部署配置
  base: '/',
  outDir: '../dist',
  
  // 头部配置
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'keywords', content: 'cloud testing, mobile testing, automation testing' }],
    ['meta', { name: 'author', content: 'High QA Team' }],
    
    // SEO 配置
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'High QA 云真机测试平台' }],
    ['meta', { property: 'og:description', content: '专业的移动设备远程控制和自动化测试解决方案' }],
    ['meta', { property: 'og:url', content: 'https://highqa.com' }],
    ['meta', { property: 'og:image', content: 'https://highqa.com/logo.png' }],
    
    // Google Analytics
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_TRACKING_ID');
    `]
  ],
  
  // 主题配置
  themeConfig: {
    // Logo 配置
    logo: '/logo.png',
    
    // 导航栏配置
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/getting-started' },
      { 
        text: '产品功能', 
        items: [
          { text: '设备管理', link: '/features/device-management' },
          { text: '远程控制', link: '/features/remote-control' },
          { text: '自动化测试', link: '/features/automation' },
          { text: '资源管理', link: '/features/resource-management' },
          { text: '性能监控', link: '/features/performance' }
        ]
      },
      { 
        text: '开发指南', 
        items: [
          { text: '架构设计', link: '/development/architecture' },
          { text: '组件开发', link: '/development/components' },
          { text: 'API接口', link: '/development/api' }
        ]
      },
      { text: '关于我们', link: '/about' }
    ],
    
    // 侧边栏配置
    sidebar: {
      '/getting-started/': [
        {
          text: '快速开始',
          items: [
            { text: '安装部署', link: '/getting-started/installation' },
            { text: '基础配置', link: '/getting-started/configuration' },
            { text: '本地开发', link: '/getting-started/development' }
          ]
        }
      ],
      '/features/': [
        {
          text: '核心功能',
          items: [
            { text: '设备管理', link: '/features/device-management' },
            { text: '远程控制', link: '/features/remote-control' },
            { text: '自动化测试', link: '/features/automation' },
            { text: '资源管理', link: '/features/resource-management' }
          ]
        },
        {
          text: '专业功能',
          items: [
            { text: '性能监控', link: '/features/performance' },
            { text: '日志分析', link: '/features/logging' },
            { text: '报告生成', link: '/features/reporting' }
          ]
        }
      ]
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Maxwellos/highqa.github.io' }
    ],
    
    // 页脚配置
    footer: {
      message: '基于 Vue 3 + Vuetify 3 + VitePress 构建',
      copyright: 'Copyright © 2024 High QA Team'
    },
    
    // 搜索配置
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/Maxwellos/highqa.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },
    
    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  },
  
  // 构建配置
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue'],
          vendor: ['vue-router']
        }
      }
    }
  },
  
  // 开发服务器配置
  server: {
    port: 5173,
    host: '0.0.0.0',
    open: true
  },
  
  // 预览服务器配置
  preview: {
    port: 4173,
    host: '0.0.0.0'
  }
})
```

## 主题自定义

### 自定义样式

```css
/* docs/.vitepress/theme/style.css */

/* 自定义颜色 */
:root {
  --vp-c-brand-1: #646cff;
  --vp-c-brand-2: #747bff;
  --vp-c-brand-3: #828bff;
  --vp-c-brand-soft: rgba(100, 108, 255, 0.14);
  
  /* 自定义字体 */
  --vp-font-family-base: "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
  --vp-font-family-mono: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
}

/* 暗色主题 */
html.dark {
  --vp-c-brand-1: #747bff;
  --vp-c-brand-2: #828bff;
  --vp-c-brand-3: #8b92ff;
  --vp-c-brand-soft: rgba(116, 123, 255, 0.16);
}

/* 自定义组件样式 */
.custom-block {
  border-left: 4px solid var(--vp-c-brand-1);
  padding: 16px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

/* 代码块样式 */
.vp-code-group {
  margin: 16px 0;
}

/* 首页样式 */
.VPHome {
  .VPHero {
    .name {
      background: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
}
```

### 自定义布局

```vue
<!-- docs/.vitepress/theme/Layout.vue -->
<template>
  <Layout>
    <template #nav-bar-title-after>
      <div class="version-badge">
        v{{ version }}
      </div>
    </template>
    
    <template #nav-bar-content-after>
      <div class="nav-extra">
        <a href="https://demo.highqa.com" target="_blank" class="demo-link">
          在线演示
        </a>
      </div>
    </template>
    
    <template #doc-footer-before>
      <div class="custom-footer">
        <p>发现问题？<a href="https://github.com/highqa/highqa.github.io/issues" target="_blank">提交 Issue</a></p>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const version = ref('1.0.0')

onMounted(() => {
  // 获取版本信息
  fetch('/api/version')
    .then(res => res.json())
    .then(data => {
      version.value = data.version
    })
})
</script>

<style scoped>
.version-badge {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 8px;
}

.nav-extra {
  display: flex;
  align-items: center;
  margin-left: 16px;
}

.demo-link {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.3s;
}

.demo-link:hover {
  background: var(--vp-c-brand-2);
}

.custom-footer {
  text-align: center;
  padding: 20px;
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 40px;
}
</style>
```

## 多语言配置

### 语言配置

```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'High QA',
      description: '云真机测试平台官方文档',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '快速开始', link: '/getting-started' }
        ]
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'High QA',
      description: 'Cloud Mobile Testing Platform Documentation',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Getting Started', link: '/en/getting-started' }
        ]
      }
    }
  }
})
```

## 插件配置

### 安装插件

```bash
# 安装常用插件
pnpm add -D @vitepress/plugin-search
pnpm add -D vitepress-plugin-comment
pnpm add -D vitepress-plugin-mermaid
```

### 配置插件

```typescript
// docs/.vitepress/config.ts
import { defineConfig } from 'vitepress'
import { SearchPlugin } from '@vitepress/plugin-search'

export default defineConfig({
  // 插件配置
  plugins: [
    SearchPlugin({
      // 搜索选项
      encode: false,
      tokenize: 'full'
    })
  ],
  
  // Markdown 配置
  markdown: {
    // 代码高亮
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    
    // 行号
    lineNumbers: true,
    
    // 自定义容器
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    
    // 配置 Mermaid
    mermaid: {
      theme: 'default'
    }
  }
})
```

## 性能配置

### 构建优化

```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  build: {
    // 输出目录
    outDir: '../dist',
    
    // 资源目录
    assetsDir: 'assets',
    
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue'],
          vuetify: ['vuetify'],
          vendor: ['vue-router', 'pinia']
        }
      }
    },
    
    // 构建报告
    reportCompressedSize: false,
    
    // 块大小警告限制
    chunkSizeWarningLimit: 1000
  }
})
```

### 缓存配置

```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  // 缓存配置
  cacheDir: '.vitepress/cache',
  
  // 预获取
  shouldPreload: (link, page) => {
    // 预加载同路由的页面
    return page.relativePath.startsWith(link)
  },
  
  // 页面元数据
  transformPageData: (pageData) => {
    // 添加最后修改时间
    pageData.lastUpdated = new Date().toISOString()
    return pageData
  }
})
```

## 安全配置

### 内容安全策略

```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  head: [
    [
      'meta',
      {
        'http-equiv': 'Content-Security-Policy',
        content: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: https:",
          "connect-src 'self' https://api.highqa.com wss://ws.highqa.com"
        ].join('; ')
      }
    ]
  ]
})
```

### 权限配置

```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  head: [
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'googlebot', content: 'index,follow' }],
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }]
  ]
})
```

## 环境特定配置

### 开发环境

```typescript
// docs/.vitepress/config.dev.ts
export default defineConfig({
  server: {
    port: 5173,
    host: '0.0.0.0',
    open: true,
    cors: true
  },
  
  define: {
    __DEV__: true,
    __PROD__: false
  }
})
```

### 生产环境

```typescript
// docs/.vitepress/config.prod.ts
export default defineConfig({
  base: '/',
  build: {
    outDir: '../dist',
    minify: 'terser',
    sourcemap: false
  },
  
  define: {
    __DEV__: false,
    __PROD__: true
  }
})
```

## 配置验证

### 配置检查脚本

```javascript
// scripts/check-config.js
const fs = require('fs')
const path = require('path')

const requiredEnvVars = [
  'VITE_APP_TITLE',
  'VITE_API_BASE_URL',
  'VITE_WS_BASE_URL'
]

const checkConfig = () => {
  const envFile = path.resolve('.env.local')
  
  if (!fs.existsSync(envFile)) {
    console.error('❌ .env.local 文件不存在')
    process.exit(1)
  }
  
  const envContent = fs.readFileSync(envFile, 'utf8')
  
  const missingVars = requiredEnvVars.filter(varName => {
    return !envContent.includes(varName)
  })
  
  if (missingVars.length > 0) {
    console.error('❌ 缺少必要的环境变量:', missingVars.join(', '))
    process.exit(1)
  }
  
  console.log('✅ 配置检查通过')
}

checkConfig()
```

### 配置测试

```javascript
// scripts/test-config.js
const { execSync } = require('child_process')

const testConfig = () => {
  try {
    // 测试构建
    execSync('pnpm run build', { stdio: 'inherit' })
    console.log('✅ 构建测试通过')
    
    // 测试预览
    execSync('pnpm run preview', { stdio: 'inherit' })
    console.log('✅ 预览测试通过')
    
  } catch (error) {
    console.error('❌ 配置测试失败:', error.message)
    process.exit(1)
  }
}

testConfig()
```

## 常见问题

### Q: 如何修改默认端口？
A: 在 `config.ts` 中修改 `server.port` 配置。

### Q: 如何自定义主题颜色？
A: 在自定义 CSS 中修改 `--vp-c-brand-*` 变量。

### Q: 如何添加自定义页面？
A: 在 `docs` 目录下创建 `.md` 文件，并在导航中添加链接。

### Q: 如何启用多语言？
A: 配置 `locales` 选项，并创建对应的语言目录。

通过以上配置，您可以完全自定义 High QA 平台的外观和行为。如需更多帮助，请参考 [VitePress 官方文档](https://vitepress.dev/) 或联系我们的技术支持。 