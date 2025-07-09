// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import mediumZoom from 'medium-zoom'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import GitHubButtons from './components/GitHubButtons.vue'
import GitHubBadges from './components/GitHubBadges.vue'
import GitHubContributors from './components/GitHubContributors.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('GitHubButtons', GitHubButtons)
    app.component('GitHubBadges', GitHubBadges)
    app.component('GitHubContributors', GitHubContributors)
  },
  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('.main img', {
        background: 'var(--vp-c-bg)',
        scrollOffset: 0,
        margin: 24,
        container: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      })
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  }
} 