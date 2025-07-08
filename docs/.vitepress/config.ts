import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'High QA',
  description: '云真机测试平台官方文档',
  lang: 'zh-CN',
  base: '/',
  
  // 启用暗色模式切换
  appearance: 'dark',
  
  // 忽略死链接检查（临时设置，建议后续修复）
  ignoreDeadLinks: true,
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'keywords', content: 'cloud testing, mobile testing, automation testing, vue, vuetify' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    siteTitle: 'High QA',
    
    nav: [
      { text: '快速开始', link: '/getting-started' },
      { text: '功能介绍', link: '/features/device-management' },
      { text: '开发指南', link: '/development/architecture' },
      { text: '部署指南', link: '/deployment-guide' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/getting-started': [
        {
          text: '快速开始',
          collapsed: false,
          items: [
            { text: '总览', link: '/getting-started' },
            { text: '安装部署', link: '/getting-started/installation' },
            { text: '基础配置', link: '/getting-started/configuration' },
            { text: '本地开发', link: '/getting-started/development' }
          ]
        }
      ],
      '/features/': [
        {
          text: '核心功能',
          collapsed: false,
          items: [
            { text: '设备管理', link: '/features/device-management' },
            { text: '远程控制', link: '/features/remote-control' },
            { text: '自动化测试', link: '/features/automation' },
            { text: '资源管理', link: '/features/resource-management' },
            { text: '性能监控', link: '/features/performance' }
          ]
        }
      ],
      '/development/': [
        {
          text: '开发指南',
          collapsed: false,
          items: [
            { text: '架构设计', link: '/development/architecture' }
          ]
        }
      ],
      '/deployment-guide': [
        {
          text: '部署指南',
          collapsed: false,
          items: [
            { text: 'GitHub Pages 部署', link: '/deployment-guide' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Maxwellos/highqa.github.io' }
    ],

    footer: {
      message: '基于 Vue 3 + Vuetify 3 构建',
      copyright: 'Copyright © 2024 High QA'
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
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

    editLink: {
      pattern: 'https://github.com/Maxwellos/highqa.github.io/edit/main/docs/:path',
      text: '编辑此页'
    },

    lastUpdated: {
      text: '更新时间',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    // 文档页脚导航
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 大纲配置
    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    // 返回顶部
    returnToTopLabel: '回到顶部'
  }
}) 