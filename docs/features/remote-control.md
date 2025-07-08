# 设备远程控制

High QA 提供了强大的设备远程控制功能，支持实时的设备屏幕共享、触控操作和各种设备控制功能。

## 🖥️ 远程控制概览

### 核心特性

- **实时屏幕共享**: 低延迟、高清晰度的设备屏幕显示
- **触控操作**: 支持点击、滑动、长按、多点触控等操作
- **布局灵活**: 支持左右分屏和上下分屏布局
- **多平台支持**: 同时支持 Android 和 iOS 设备
- **响应式设计**: 适配不同屏幕尺寸和设备类型

### 技术架构

```
客户端浏览器 ←→ WebSocket ←→ Agent 服务器 ←→ 设备
```

- **WebSocket 连接**: 实现低延迟的实时通信
- **H.264 视频编码**: 高效的视频流传输
- **Touch 事件映射**: 将浏览器事件映射到设备操作

## 📱 设备控制界面

### 分屏布局

远程控制界面采用灵活的分屏布局设计：

#### 左右分屏布局
- **左侧**: 控制面板（设备信息、操作按钮、功能面板）
- **右侧**: 设备屏幕显示区域
- **适用场景**: 宽屏显示器、桌面环境

#### 上下分屏布局
- **上方**: 设备屏幕显示区域
- **下方**: 控制面板（设备信息、操作按钮、功能面板）
- **适用场景**: 移动设备、窄屏环境

### 布局切换

```vue
<template>
  <div class="remote-control-layout">
    <!-- 布局切换按钮 -->
    <v-btn
      @click="toggleLayout"
      class="layout-toggle-btn"
      icon="mdi-swap-horizontal"
      size="small"
      color="primary"
    />
    
    <!-- 动态布局容器 -->
    <div
      :class="[
        'layout-container',
        isHorizontal ? 'horizontal-layout' : 'vertical-layout'
      ]"
    >
      <!-- 设备屏幕区域 -->
      <div class="screen-area" :style="screenAreaStyle">
        <VideoContainer />
      </div>
      
      <!-- 控制面板区域 -->
      <div class="control-area" :style="controlAreaStyle">
        <ControlPanel />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isHorizontal = ref(true)
const splitRatio = ref(70) // 屏幕区域占比

const toggleLayout = () => {
  isHorizontal.value = !isHorizontal.value
}

const screenAreaStyle = computed(() => {
  return isHorizontal.value
    ? { width: `${splitRatio.value}%` }
    : { height: `${splitRatio.value}%` }
})
</script>
```

### 分屏比例调整

支持拖拽调整分屏比例：

```vue
<template>
  <div class="split-pane">
    <!-- 分割线 -->
    <div
      class="split-line"
      :class="{ 'horizontal': isHorizontal }"
      @mousedown="startDrag"
    />
  </div>
</template>

<script setup>
const startDrag = (e) => {
  const startPos = isHorizontal.value ? e.clientX : e.clientY
  const startRatio = splitRatio.value
  
  const onMouseMove = (e) => {
    const currentPos = isHorizontal.value ? e.clientX : e.clientY
    const containerSize = isHorizontal.value 
      ? container.value.clientWidth 
      : container.value.clientHeight
    
    const deltaRatio = ((currentPos - startPos) / containerSize) * 100
    splitRatio.value = Math.min(Math.max(startRatio + deltaRatio, 20), 80)
  }
  
  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }
  
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}
</script>
```

## 📺 视频容器

### 视频流处理

```vue
<template>
  <div class="video-container">
    <video
      ref="videoRef"
      :src="videoSrc"
      autoplay
      muted
      playsinline
      @loadedmetadata="onVideoLoaded"
      @error="onVideoError"
    />
    
    <!-- 触摸层 -->
    <div
      class="touch-layer"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useUdtAgent } from '@/hooks/useUdtAgent'

const videoRef = ref()
const { createWebSocketConnection } = useUdtAgent()

let wsConnection = null

onMounted(() => {
  // 建立 WebSocket 连接
  wsConnection = createWebSocketConnection('/video', 'video-stream')
  
  wsConnection.onmessage = (event) => {
    if (event.data instanceof Blob) {
      // 处理视频流数据
      const videoUrl = URL.createObjectURL(event.data)
      videoRef.value.src = videoUrl
    }
  }
})

const onVideoLoaded = () => {
  console.log('视频加载完成')
}

const onVideoError = (error) => {
  console.error('视频加载失败:', error)
}
</script>
```

### 触摸事件处理

```typescript
// 触摸事件处理
const handleTouchEvent = (event: TouchEvent) => {
  const touches = Array.from(event.touches).map(touch => ({
    id: touch.identifier,
    x: touch.clientX,
    y: touch.clientY,
    force: touch.force || 1
  }))
  
  const touchData = {
    type: event.type,
    touches,
    timestamp: Date.now()
  }
  
  // 发送触摸事件到设备
  wsConnection?.send(JSON.stringify({
    action: 'touch',
    data: touchData
  }))
}

// 鼠标事件处理
const handleMouseEvent = (event: MouseEvent) => {
  const mouseData = {
    type: event.type,
    x: event.clientX,
    y: event.clientY,
    button: event.button,
    timestamp: Date.now()
  }
  
  // 发送鼠标事件到设备
  wsConnection?.send(JSON.stringify({
    action: 'mouse',
    data: mouseData
  }))
}
```

## 🎛️ 控制面板

### Android 控制面板

```vue
<template>
  <div class="android-control-panel">
    <!-- 设备信息 -->
    <DeviceInfo :device="deviceInfo" />
    
    <!-- 导航按钮 -->
    <div class="navigation-buttons">
      <v-btn
        @click="sendKeyEvent('BACK')"
        icon="mdi-arrow-left"
        color="primary"
        size="large"
      />
      <v-btn
        @click="sendKeyEvent('HOME')"
        icon="mdi-home"
        color="primary"
        size="large"
      />
      <v-btn
        @click="sendKeyEvent('RECENT')"
        icon="mdi-view-carousel"
        color="primary"
        size="large"
      />
    </div>
    
    <!-- 音量控制 -->
    <div class="volume-controls">
      <v-btn
        @click="sendKeyEvent('VOLUME_UP')"
        icon="mdi-volume-plus"
        color="success"
      />
      <v-btn
        @click="sendKeyEvent('VOLUME_DOWN')"
        icon="mdi-volume-minus"
        color="warning"
      />
    </div>
    
    <!-- 电源控制 -->
    <div class="power-controls">
      <v-btn
        @click="sendKeyEvent('POWER')"
        icon="mdi-power"
        color="error"
      />
    </div>
  </div>
</template>

<script setup>
import { useUdtAgent } from '@/hooks/useUdtAgent'

const { createWebSocketConnection } = useUdtAgent()

const sendKeyEvent = (keyCode: string) => {
  wsConnection?.send(JSON.stringify({
    action: 'key',
    data: { keyCode }
  }))
}
</script>
```

### iOS 控制面板

```vue
<template>
  <div class="ios-control-panel">
    <!-- 设备信息 -->
    <DeviceInfo :device="deviceInfo" />
    
    <!-- iOS 专用按钮 -->
    <div class="ios-buttons">
      <v-btn
        @click="sendKeyEvent('HOME')"
        icon="mdi-home"
        color="primary"
        size="large"
      />
      <v-btn
        @click="sendKeyEvent('SIRI')"
        icon="mdi-microphone"
        color="primary"
        size="large"
      />
    </div>
    
    <!-- 音量控制 -->
    <div class="volume-controls">
      <v-btn
        @click="sendKeyEvent('VOLUME_UP')"
        icon="mdi-volume-plus"
        color="success"
      />
      <v-btn
        @click="sendKeyEvent('VOLUME_DOWN')"
        icon="mdi-volume-minus"
        color="warning"
      />
    </div>
  </div>
</template>
```

## 🔧 功能面板

### 面板管理器

```vue
<template>
  <div class="panel-manager">
    <!-- 面板导航 -->
    <div class="panel-nav">
      <v-btn
        v-for="panel in panels"
        :key="panel.id"
        @click="setActivePanel(panel.id)"
        :color="activePanel === panel.id ? 'primary' : 'default'"
        :icon="panel.icon"
        size="small"
      />
    </div>
    
    <!-- 面板内容 -->
    <div class="panel-content" :class="{ 'expanded': isPanelExpanded }">
      <component :is="activePanelComponent" />
    </div>
    
    <!-- 面板调整手柄 -->
    <div
      class="panel-handle"
      @mousedown="startPanelResize"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const panels = [
  { id: 'apps', name: '应用管理', icon: 'mdi-apps', component: 'AppPanel' },
  { id: 'files', name: '文件管理', icon: 'mdi-folder', component: 'FilePanel' },
  { id: 'performance', name: '性能监控', icon: 'mdi-chart-line', component: 'PerformancePanel' },
  { id: 'logs', name: '日志查看', icon: 'mdi-text-box', component: 'LogPanel' }
]

const activePanel = ref('apps')
const isPanelExpanded = ref(false)

const activePanelComponent = computed(() => {
  return panels.find(p => p.id === activePanel.value)?.component
})
</script>
```

### 应用管理面板

```vue
<template>
  <div class="app-panel">
    <v-list>
      <v-list-item
        v-for="app in apps"
        :key="app.packageName"
        @click="launchApp(app)"
      >
        <template #prepend>
          <v-avatar>
            <v-img :src="app.icon" alt="App Icon" />
          </v-avatar>
        </template>
        
        <v-list-item-title>{{ app.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ app.packageName }}</v-list-item-subtitle>
        
        <template #append>
          <v-menu>
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-dots-vertical"
                size="small"
                variant="text"
              />
            </template>
            <v-list>
              <v-list-item @click="launchApp(app)">
                <v-list-item-title>启动</v-list-item-title>
              </v-list-item>
              <v-list-item @click="uninstallApp(app)">
                <v-list-item-title>卸载</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUdtAgent } from '@/hooks/useUdtAgent'

const apps = ref([])
const { createWebSocketConnection } = useUdtAgent()

const launchApp = (app) => {
  wsConnection?.send(JSON.stringify({
    action: 'launch_app',
    data: { packageName: app.packageName }
  }))
}

const uninstallApp = (app) => {
  wsConnection?.send(JSON.stringify({
    action: 'uninstall_app',
    data: { packageName: app.packageName }
  }))
}

onMounted(() => {
  // 获取应用列表
  fetchApps()
})
</script>
```

### 性能监控面板

```vue
<template>
  <div class="performance-panel">
    <!-- CPU 使用率 -->
    <div class="metric-card">
      <h3>CPU 使用率</h3>
      <div ref="cpuChart" class="chart-container"></div>
    </div>
    
    <!-- 内存使用率 -->
    <div class="metric-card">
      <h3>内存使用率</h3>
      <div ref="memoryChart" class="chart-container"></div>
    </div>
    
    <!-- 网络流量 -->
    <div class="metric-card">
      <h3>网络流量</h3>
      <div ref="networkChart" class="chart-container"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { useUdtAgent } from '@/hooks/useUdtAgent'

const cpuChart = ref()
const memoryChart = ref()
const networkChart = ref()

let cpuChartInstance = null
let memoryChartInstance = null
let networkChartInstance = null

const { createWebSocketConnection } = useUdtAgent()

onMounted(() => {
  initCharts()
  startPerformanceMonitoring()
})

const initCharts = () => {
  cpuChartInstance = echarts.init(cpuChart.value)
  memoryChartInstance = echarts.init(memoryChart.value)
  networkChartInstance = echarts.init(networkChart.value)
}

const startPerformanceMonitoring = () => {
  const ws = createWebSocketConnection('/performance', 'performance-monitor')
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    updateCharts(data)
  }
}

const updateCharts = (data) => {
  // 更新 CPU 图表
  cpuChartInstance.setOption({
    xAxis: { data: data.timestamps },
    series: [{ data: data.cpu }]
  })
  
  // 更新内存图表
  memoryChartInstance.setOption({
    xAxis: { data: data.timestamps },
    series: [{ data: data.memory }]
  })
  
  // 更新网络图表
  networkChartInstance.setOption({
    xAxis: { data: data.timestamps },
    series: [
      { name: '上行', data: data.networkUp },
      { name: '下行', data: data.networkDown }
    ]
  })
}
</script>
```

## 🎮 操作体验优化

### 触摸延迟优化

```typescript
// 使用 requestAnimationFrame 优化触摸响应
const optimizedTouchHandler = (event: TouchEvent) => {
  event.preventDefault()
  
  requestAnimationFrame(() => {
    const processedEvent = preprocessTouchEvent(event)
    sendTouchEvent(processedEvent)
  })
}

// 触摸事件预处理
const preprocessTouchEvent = (event: TouchEvent) => {
  const videoRect = videoRef.value.getBoundingClientRect()
  const deviceRect = { width: 1080, height: 1920 } // 设备分辨率
  
  return {
    type: event.type,
    touches: Array.from(event.touches).map(touch => ({
      id: touch.identifier,
      x: Math.round((touch.clientX - videoRect.left) * deviceRect.width / videoRect.width),
      y: Math.round((touch.clientY - videoRect.top) * deviceRect.height / videoRect.height),
      force: touch.force || 1
    }))
  }
}
```

### 手势识别

```typescript
// 手势识别器
class GestureRecognizer {
  private startTime = 0
  private startPosition = { x: 0, y: 0 }
  private isLongPress = false
  
  onTouchStart(touch: Touch) {
    this.startTime = Date.now()
    this.startPosition = { x: touch.clientX, y: touch.clientY }
    
    // 长按检测
    this.longPressTimer = setTimeout(() => {
      this.isLongPress = true
      this.onLongPress(touch)
    }, 500)
  }
  
  onTouchMove(touch: Touch) {
    const distance = Math.sqrt(
      Math.pow(touch.clientX - this.startPosition.x, 2) +
      Math.pow(touch.clientY - this.startPosition.y, 2)
    )
    
    if (distance > 10) {
      clearTimeout(this.longPressTimer)
      this.isLongPress = false
    }
  }
  
  onTouchEnd(touch: Touch) {
    clearTimeout(this.longPressTimer)
    
    if (!this.isLongPress) {
      const duration = Date.now() - this.startTime
      if (duration < 200) {
        this.onTap(touch)
      }
    }
  }
  
  onTap(touch: Touch) {
    // 单击处理
  }
  
  onLongPress(touch: Touch) {
    // 长按处理
  }
}
```

## 🔊 音视频处理

### 音频控制

```typescript
// 音频控制器
class AudioController {
  private audioContext: AudioContext
  private gainNode: GainNode
  
  constructor() {
    this.audioContext = new AudioContext()
    this.gainNode = this.audioContext.createGain()
    this.gainNode.connect(this.audioContext.destination)
  }
  
  setVolume(volume: number) {
    this.gainNode.gain.value = Math.max(0, Math.min(1, volume))
  }
  
  mute() {
    this.gainNode.gain.value = 0
  }
  
  unmute() {
    this.gainNode.gain.value = 1
  }
}
```

### 视频质量调整

```typescript
// 视频质量控制
const videoQualityOptions = [
  { label: '低质量', width: 480, height: 854, bitrate: 1000 },
  { label: '中质量', width: 720, height: 1280, bitrate: 2000 },
  { label: '高质量', width: 1080, height: 1920, bitrate: 4000 }
]

const setVideoQuality = (quality: VideoQuality) => {
  wsConnection?.send(JSON.stringify({
    action: 'set_video_quality',
    data: quality
  }))
}
```

## 📱 响应式设计

### 移动端适配

```vue
<template>
  <div class="mobile-remote-control">
    <!-- 移动端专用布局 -->
    <div class="mobile-layout" v-if="isMobile">
      <!-- 全屏视频区域 -->
      <div class="mobile-video-area">
        <VideoContainer />
      </div>
      
      <!-- 底部控制栏 -->
      <div class="mobile-control-bar">
        <v-bottom-navigation v-model="activeTab">
          <v-btn value="controls" icon="mdi-gamepad-variant" />
          <v-btn value="apps" icon="mdi-apps" />
          <v-btn value="files" icon="mdi-folder" />
          <v-btn value="settings" icon="mdi-cog" />
        </v-bottom-navigation>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)
</script>
```

### 屏幕旋转处理

```typescript
// 屏幕旋转处理
const handleOrientationChange = () => {
  const orientation = screen.orientation?.angle || 0
  
  if (orientation === 90 || orientation === 270) {
    // 横屏模式
    setLayoutMode('landscape')
  } else {
    // 竖屏模式
    setLayoutMode('portrait')
  }
}

window.addEventListener('orientationchange', handleOrientationChange)
```

## 🚀 高级功能

### 屏幕录制

```typescript
// 屏幕录制功能
class ScreenRecorder {
  private mediaRecorder: MediaRecorder
  private chunks: Blob[] = []
  
  async startRecording() {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: 'screen' }
    })
    
    this.mediaRecorder = new MediaRecorder(stream)
    this.mediaRecorder.ondataavailable = (event) => {
      this.chunks.push(event.data)
    }
    
    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.chunks, { type: 'video/webm' })
      this.downloadRecording(blob)
      this.chunks = []
    }
    
    this.mediaRecorder.start()
  }
  
  stopRecording() {
    this.mediaRecorder.stop()
  }
  
  private downloadRecording(blob: Blob) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `recording-${Date.now()}.webm`
    a.click()
    URL.revokeObjectURL(url)
  }
}
```

### 文本输入

```vue
<template>
  <div class="text-input-panel">
    <v-textarea
      v-model="inputText"
      label="输入文本"
      placeholder="输入要发送到设备的文本"
      rows="3"
      @keyup.enter="sendText"
    />
    <v-btn @click="sendText" color="primary">
      发送文本
    </v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputText = ref('')

const sendText = () => {
  if (!inputText.value.trim()) return
  
  wsConnection?.send(JSON.stringify({
    action: 'input_text',
    data: { text: inputText.value }
  }))
  
  inputText.value = ''
}
</script>
```

## 📊 性能监控

### 连接质量监控

```typescript
// 连接质量监控
class ConnectionMonitor {
  private pingInterval: number
  private latencyHistory: number[] = []
  
  startMonitoring() {
    this.pingInterval = setInterval(() => {
      this.measureLatency()
    }, 1000)
  }
  
  private async measureLatency() {
    const startTime = performance.now()
    
    try {
      await fetch('/api/ping')
      const latency = performance.now() - startTime
      this.latencyHistory.push(latency)
      
      if (this.latencyHistory.length > 100) {
        this.latencyHistory.shift()
      }
      
      this.updateConnectionQuality()
    } catch (error) {
      console.warn('连接质量检测失败:', error)
    }
  }
  
  private updateConnectionQuality() {
    const avgLatency = this.latencyHistory.reduce((a, b) => a + b, 0) / this.latencyHistory.length
    
    let quality = 'excellent'
    if (avgLatency > 100) quality = 'good'
    if (avgLatency > 200) quality = 'poor'
    if (avgLatency > 500) quality = 'bad'
    
    this.onQualityChange(quality)
  }
  
  private onQualityChange(quality: string) {
    // 更新 UI 显示
  }
}
```

## 🔗 相关链接

- [设备管理](/features/device-management)
- [自动化测试](/features/automation)
- [开发指南](/development/architecture)
- [API 文档](/development/api)

---

::: tip 💡 小贴士
为了获得最佳的远程控制体验，建议在稳定的网络环境下使用，并确保设备和 Agent 服务器之间的连接质量良好。
::: 