import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'PandaTest',
  description: '云真机测试平台官方文档',
  lang: 'zh-CN',
  base: '/',

  // 启用暗色模式切换
  appearance: 'dark',

  // 忽略死链接检查（临时设置，建议后续修复）
  ignoreDeadLinks: true,

  // Markdown 配置
  markdown: {
    // 代码行号
    lineNumbers: true,
    // 语法高亮主题
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    // 代码组配置
    codeTransformers: []
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'keywords', content: 'cloud testing, mobile testing, automation testing, vue, vuetify' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    siteTitle: 'PandaTest',

    nav: [
      { text: '使用教程', link: '/tutorials/' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/tutorials/': [
        {
          text: '设备管理',
          collapsed: false,
          items: [
            { text: '设备列表', link: '/tutorials/device-management/device-list' },
            { text: '设备调试', link: '/tutorials/device-management/device-debug' },
            { text: '脚本录制', link: '/tutorials/device-management/script-recording' }
          ]
        },

        {
          text: '设备群控',
          collapsed: false,
          items: [
            { text: '群控管理', link: '/tutorials/group-control/device-group-control' }
          ]
        },
        {
          text: '应用管理',
          collapsed: false,
          items: [
            { text: '应用管理', link: '/tutorials/app-management/' }
          ]
        },
        {
          text: '脚本管理',
          collapsed: false,
          items: [
            { text: '测试脚本', link: '/tutorials/script-management/test-scripts' },
            { text: '测试用例', link: '/tutorials/script-management/test-cases' }
          ]
        },
        {
          text: '自动化测试',
          collapsed: false,
          items: [
            { text: '测试套件', link: '/tutorials/automation-testing/automation-suite' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/PandaTestGrid' }
    ],

    footer: {
      message: '版权所有 © 2024 PandaTest 云真机测试平台',
      copyright: '保留所有权利'
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
      pattern: 'https://github.com/PandaTestGrid/pandatestgrid.github.io/edit/main/docs/:path',
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