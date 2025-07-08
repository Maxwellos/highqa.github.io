# 安装部署

本指南将帮助您快速安装和部署 High QA 云真机测试平台。

## 系统要求

### 基础环境
- **操作系统**: Windows 10/11, macOS 12+, Ubuntu 18.04+
- **Node.js**: 18.x 或 20.x（推荐 LTS 版本）
- **包管理器**: npm 8+ / yarn 1.22+ / pnpm 8+（推荐 pnpm）
- **内存**: 最低 4GB，推荐 8GB+
- **磁盘空间**: 至少 2GB 可用空间

### 浏览器要求
- **Chrome**: 90+ （推荐）
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### 开发工具（可选）
- **VS Code**: 推荐使用 VS Code 进行开发
- **Git**: 用于版本控制
- **Docker**: 用于容器化部署（可选）

## 安装步骤

### 1. 安装 Node.js

#### Windows
```bash
# 使用 Chocolatey 安装
choco install nodejs

# 或者从官网下载安装包
# https://nodejs.org/
```

#### macOS
```bash
# 使用 Homebrew 安装
brew install node

# 或者使用 MacPorts
sudo port install nodejs18 +universal
```

#### Ubuntu/Debian
```bash
# 使用 NodeSource 仓库
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 或者使用 snap
sudo snap install node --classic
```

### 2. 验证安装
```bash
node --version
npm --version
```

### 3. 安装包管理器（推荐 pnpm）
```bash
# 安装 pnpm
npm install -g pnpm

# 验证安装
pnpm --version
```

### 4. 克隆项目
```bash
# 克隆仓库
git clone https://github.com/Maxwellos/highqa.github.io.git

# 进入项目目录
cd highqa.github.io
```

### 5. 安装依赖
```bash
# 使用 pnpm 安装（推荐）
pnpm install

# 或者使用 npm
npm install

# 或者使用 yarn
yarn install
```

### 6. 启动开发服务器
```bash
# 启动开发服务器
pnpm run dev

# 或者启动文档服务器
pnpm run docs:dev
```

## 部署选项

### 1. 静态网站部署

#### GitHub Pages
```bash
# 构建项目
pnpm run build

# 部署到 GitHub Pages
pnpm run deploy
```

#### Vercel 部署
```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署到 Vercel
vercel --prod
```

#### Netlify 部署
```bash
# 构建项目
pnpm run build

# 上传 docs/.vitepress/dist 目录到 Netlify
```

### 2. 服务器部署

#### Nginx 配置
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/highqa-docs;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # 缓存配置
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache 配置
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/highqa-docs
    
    <Directory /var/www/highqa-docs>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # 启用压缩
    LoadModule deflate_module modules/mod_deflate.so
    <Location />
        SetOutputFilter DEFLATE
        SetEnvIfNoCase Request_URI \
            \.(?:gif|jpe?g|png)$ no-gzip dont-vary
    </Location>
</VirtualHost>
```

### 3. Docker 部署

#### Dockerfile
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml
```yaml
version: '3.8'
services:
  highqa-docs:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
```

#### 部署命令
```bash
# 构建镜像
docker build -t highqa-docs .

# 运行容器
docker run -d -p 80:80 --name highqa-docs highqa-docs

# 或者使用 docker-compose
docker-compose up -d
```

## 环境配置

### 1. 创建配置文件
```bash
# 复制示例配置
cp .env.example .env.local
```

### 2. 配置环境变量
```env
# .env.local
VITE_APP_TITLE=High QA 云真机测试平台
VITE_APP_BASE_URL=https://your-domain.com
VITE_API_BASE_URL=https://api.your-domain.com
VITE_WS_BASE_URL=wss://ws.your-domain.com
VITE_DEBUG=false
```

### 3. 自定义配置
```javascript
// docs/.vitepress/config.ts
export default defineConfig({
  title: 'High QA',
  description: '云真机测试平台官方文档',
  base: '/', // 如果部署在子路径，修改这里
  
  themeConfig: {
    // 自定义导航和侧边栏
    nav: [
      // 您的导航配置
    ],
    sidebar: {
      // 您的侧边栏配置
    }
  }
})
```

## 构建优化

### 1. 构建性能优化
```bash
# 使用 pnpm 提高安装速度
pnpm config set registry https://registry.npmmirror.com

# 启用并行构建
pnpm config set jobs 4

# 构建项目
pnpm run build --parallel
```

### 2. 资源优化
```javascript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          ui: ['vuetify']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

## 常见问题

### Q: Node.js 版本不兼容
```bash
# 使用 nvm 管理 Node.js 版本
nvm install 18
nvm use 18

# 验证版本
node --version
```

### Q: 依赖安装失败
```bash
# 清除缓存
pnpm store prune
# 或者
npm cache clean --force

# 重新安装
rm -rf node_modules package-lock.json
pnpm install
```

### Q: 构建失败
```bash
# 检查内存使用
node --max-old-space-size=4096 node_modules/.bin/vitepress build docs

# 或者设置环境变量
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm run build
```

### Q: 端口冲突
```bash
# 修改端口
pnpm run dev --port 3001

# 或者在 package.json 中配置
{
  "scripts": {
    "dev": "vitepress dev docs --port 3001"
  }
}
```

## 升级指南

### 1. 升级依赖
```bash
# 检查过期的包
pnpm outdated

# 更新所有依赖
pnpm update

# 更新特定包
pnpm update vitepress@latest
```

### 2. 版本迁移
```bash
# 查看变更日志
git log --oneline --since="2024-01-01"

# 备份当前版本
git tag v1.0.0-backup

# 合并最新更改
git pull origin main
```

## 性能监控

### 1. 构建分析
```bash
# 分析构建结果
pnpm run build --analyze

# 生成构建报告
pnpm run build:report
```

### 2. 运行时监控
```javascript
// 添加性能监控
if (import.meta.env.PROD) {
  // 监控首屏加载时间
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0]
    console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart)
  })
}
```

## 安全配置

### 1. HTTPS 配置
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # 安全头部
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

### 2. 内容安全策略
```html
<!-- 在 HTML 头部添加 CSP -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

## 维护指南

### 1. 定期维护
```bash
# 更新依赖
pnpm update

# 安全审计
pnpm audit
pnpm audit fix

# 清理缓存
pnpm store prune
```

### 2. 备份策略
```bash
# 备份配置文件
cp .env.local .env.backup

# 备份数据库（如果有）
mongodump --out backup/$(date +%Y%m%d)

# 自动备份脚本
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf backup/highqa-docs-$DATE.tar.gz docs/ .env.local
```

这样，您就完成了 High QA 云真机测试平台的安装和部署。如果遇到任何问题，请查看[常见问题](/getting-started/troubleshooting)或联系我们的技术支持。 