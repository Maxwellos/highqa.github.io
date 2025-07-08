# 设备管理

High QA 提供了强大的设备管理功能，支持多平台设备的统一管理、分组组织和状态监控。

## 📱 设备概览

### 支持的设备类型

- **Android 设备**: 支持 Android 4.4+ 系统
- **iOS 设备**: 支持 iOS 10.0+ 系统
- **模拟器**: 支持 Android 模拟器和 iOS 模拟器

### 设备信息展示

每个设备都会显示以下关键信息：

| 信息项 | 说明 |
|--------|------|
| 设备名称 | 设备的显示名称 |
| 设备型号 | 具体的硬件型号 |
| 系统版本 | 操作系统版本号 |
| 分辨率 | 屏幕分辨率 |
| 电池电量 | 当前电池电量百分比 |
| 连接状态 | 在线/离线/占用等状态 |
| Agent 节点 | 设备所属的 Agent 服务器 |

## 🏷️ 设备分组管理

### 分组类型

High QA 支持多种设备分组方式：

#### 1. 手动分组
- 用户手动选择设备创建分组
- 完全自定义的分组规则
- 适用于特定测试场景

#### 2. 自动分组
- 基于设备属性自动分组
- 支持按系统版本、品牌、型号等规则
- 实时更新分组内容

#### 3. 混合分组
- 结合手动和自动分组规则
- 更灵活的分组策略
- 适用于复杂的测试需求

### 分组管理操作

```typescript
// 创建新分组
const newGroup = {
  name: '高端Android设备',
  type: 'auto',
  rules: [
    { field: 'platform', operator: 'equals', value: 'android' },
    { field: 'price_range', operator: 'gte', value: 3000 }
  ]
}

// 手动添加设备到分组
addDevicesToGroup(groupId, [deviceId1, deviceId2])

// 移除设备
removeDevicesFromGroup(groupId, [deviceId1])
```

## 🔍 智能设备筛选

### 多维度筛选

High QA 提供了强大的设备筛选功能：

#### 基础筛选
- **平台**: Android、iOS、HarmonyOS
- **状态**: 在线、离线、占用、维护
- **制造商**: 华为、小米、苹果、三星等
- **系统版本**: 具体版本号范围

#### 高级筛选
- **设备性能**: CPU、内存、存储空间
- **网络类型**: WiFi、4G、5G
- **屏幕规格**: 分辨率、屏幕尺寸、像素密度
- **特殊功能**: 指纹、人脸识别、NFC等

### 筛选器组件

```vue
<template>
  <DeviceFilter
    :filters="filterConfig"
    @filter-change="handleFilterChange"
  />
</template>

<script setup>
const filterConfig = {
  platform: ['android', 'ios'],
  status: ['online'],
  manufacturer: ['huawei', 'xiaomi'],
  version: { min: '10.0', max: '13.0' }
}

const handleFilterChange = (filters) => {
  // 处理筛选条件变化
  updateDeviceList(filters)
}
</script>
```

## 📊 设备状态监控

### 实时状态同步

设备状态会实时同步更新：

- **连接状态**: 通过 WebSocket 实时监控
- **资源使用**: CPU、内存、存储使用情况
- **网络状态**: 网络连接质量和速度
- **电池状态**: 电量、充电状态、温度

### 状态指示器

```vue
<template>
  <div class="device-status">
    <v-chip
      :color="getStatusColor(device.status)"
      :icon="getStatusIcon(device.status)"
      size="small"
    >
      {{ getStatusText(device.status) }}
    </v-chip>
  </div>
</template>

<script setup>
const getStatusColor = (status) => {
  const colors = {
    online: 'success',
    offline: 'error',
    occupied: 'warning',
    maintenance: 'info'
  }
  return colors[status] || 'default'
}
</script>
```

## 🔄 设备操作

### 基本操作

#### 设备连接
```typescript
// 连接设备
const connectDevice = async (deviceId: string) => {
  try {
    const response = await api.connectDevice(deviceId)
    if (response.success) {
      // 更新设备状态
      updateDeviceStatus(deviceId, 'connected')
      // 跳转到控制台
      router.push(`/device/console/${deviceId}`)
    }
  } catch (error) {
    showError('设备连接失败')
  }
}
```

#### 设备重启
```typescript
// 重启设备
const rebootDevice = async (deviceId: string) => {
  await api.rebootDevice(deviceId)
  showSuccess('设备重启命令已发送')
}
```

### 批量操作

支持对多个设备进行批量操作：

- **批量重启**: 同时重启多个设备
- **批量更新**: 批量推送应用或系统更新
- **批量配置**: 统一配置设备参数
- **批量测试**: 在多个设备上同时执行测试

```typescript
// 批量操作示例
const batchOperation = async (deviceIds: string[], operation: string) => {
  const results = await Promise.allSettled(
    deviceIds.map(id => api.deviceOperation(id, operation))
  )
  
  // 处理结果
  const success = results.filter(r => r.status === 'fulfilled').length
  const failed = results.length - success
  
  showMessage(`操作完成: ${success} 成功, ${failed} 失败`)
}
```

## 🛠️ 设备维护

### 设备健康检查

定期进行设备健康检查：

```typescript
// 设备健康检查
const healthCheck = async (deviceId: string) => {
  const checks = [
    { name: 'ADB连接', test: () => testAdbConnection(deviceId) },
    { name: '系统响应', test: () => testSystemResponse(deviceId) },
    { name: '存储空间', test: () => checkStorageSpace(deviceId) },
    { name: '网络连接', test: () => testNetworkConnection(deviceId) }
  ]
  
  const results = await Promise.all(
    checks.map(async (check) => {
      try {
        const result = await check.test()
        return { name: check.name, status: 'pass', result }
      } catch (error) {
        return { name: check.name, status: 'fail', error }
      }
    })
  )
  
  return results
}
```

### 设备清理

定期清理设备数据和缓存：

- **清理缓存**: 清除应用缓存和系统缓存
- **清理日志**: 清除系统日志和应用日志
- **清理文件**: 清除临时文件和测试文件
- **重置设置**: 重置为默认测试配置

## 📈 数据统计

### 设备使用统计

```vue
<template>
  <div class="device-statistics">
    <v-row>
      <v-col cols="12" md="3">
        <StatCard
          title="总设备数"
          :value="stats.totalDevices"
          icon="mdi-cellphone"
          color="primary"
        />
      </v-col>
      <v-col cols="12" md="3">
        <StatCard
          title="在线设备"
          :value="stats.onlineDevices"
          icon="mdi-wifi"
          color="success"
        />
      </v-col>
      <v-col cols="12" md="3">
        <StatCard
          title="使用中设备"
          :value="stats.occupiedDevices"
          icon="mdi-account-check"
          color="warning"
        />
      </v-col>
      <v-col cols="12" md="3">
        <StatCard
          title="离线设备"
          :value="stats.offlineDevices"
          icon="mdi-wifi-off"
          color="error"
        />
      </v-col>
    </v-row>
  </div>
</template>
```

### 使用趋势分析

- **设备使用率**: 各设备的使用频率统计
- **热门设备**: 最受欢迎的设备型号
- **使用时长**: 设备平均使用时长
- **故障率**: 设备故障和维护记录

## 🚀 高级功能

### 设备预约

支持设备预约功能，避免资源冲突：

```typescript
// 预约设备
const reserveDevice = async (deviceId: string, timeSlot: TimeSlot) => {
  const reservation = {
    deviceId,
    startTime: timeSlot.start,
    endTime: timeSlot.end,
    userId: getCurrentUserId(),
    purpose: '自动化测试'
  }
  
  await api.createReservation(reservation)
  showSuccess('设备预约成功')
}
```

### 设备标签

为设备添加自定义标签：

```vue
<template>
  <div class="device-tags">
    <v-chip
      v-for="tag in device.tags"
      :key="tag"
      size="small"
      color="primary"
      variant="outlined"
    >
      {{ tag }}
    </v-chip>
  </div>
</template>
```

## 🔧 配置选项

### 全局设置

```typescript
// 设备管理全局配置
const deviceConfig = {
  // 自动刷新间隔（秒）
  refreshInterval: 30,
  
  // 设备超时时间（分钟）
  deviceTimeout: 10,
  
  // 最大并发连接数
  maxConcurrentConnections: 50,
  
  // 启用设备健康检查
  enableHealthCheck: true,
  
  // 健康检查间隔（分钟）
  healthCheckInterval: 60
}
```

### 用户偏好设置

```typescript
// 用户个性化设置
const userPreferences = {
  // 默认视图模式
  defaultViewMode: 'grid', // 'grid' | 'list'
  
  // 设备排序方式
  defaultSortBy: 'name', // 'name' | 'status' | 'lastUsed'
  
  // 显示的设备信息列
  visibleColumns: ['name', 'platform', 'status', 'battery'],
  
  // 自动连接偏好设备
  autoConnectPreferred: true
}
```

## 💡 最佳实践

### 设备命名规范

建议使用统一的设备命名规范：

```
格式: {品牌}-{型号}-{系统版本}-{编号}
示例: 
- Huawei-P40-Android11-001
- iPhone-13-iOS15-002
- Samsung-S21-Android12-003
```

### 分组策略

- **按项目分组**: 为不同项目创建专用设备分组
- **按平台分组**: 区分 Android 和 iOS 设备
- **按性能分组**: 高端、中端、低端设备分组
- **按用途分组**: 开发、测试、演示专用设备

### 维护计划

- **定期健康检查**: 每日进行设备健康检查
- **定期清理**: 每周清理设备数据和缓存
- **系统更新**: 定期更新设备系统和应用
- **硬件检查**: 定期检查设备硬件状态

## 🔗 相关链接

- [设备远程控制](/features/remote-control)
- [资源管理](/features/resource-management)
- [API 文档](/development/api)
- [故障排除](/troubleshooting)

---

::: tip 💡 小贴士
合理的设备管理是提高测试效率的关键。建议定期审查设备分组和筛选策略，确保它们符合您的测试需求。
::: 