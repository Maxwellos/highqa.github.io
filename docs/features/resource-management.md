# 资源管理

High QA 平台提供完整的资源管理系统，统一管理测试过程中的各类资源，包括应用包、设备分组、Agent 节点、测试数据等，确保测试资源的高效利用和统一管理。

## 功能概述

### 📦 应用包管理
- **多格式支持**：支持 APK、IPA、HAP 等多种应用包格式
- **版本管理**：应用包的版本控制和历史记录
- **分发管理**：应用包的分发和部署功能
- **元数据管理**：应用包的详细信息和标签管理

### 🏷️ 设备分组
- **智能分组**：根据设备属性自动分组
- **自定义分组**：手动创建和管理设备分组
- **动态分组**：基于条件的动态设备分组
- **权限控制**：分组级别的权限管理

### 🖥️ Agent 节点管理
- **节点监控**：实时监控 Agent 节点状态
- **负载均衡**：智能的负载均衡和任务分发
- **健康检查**：自动的节点健康检查和故障恢复
- **配置管理**：Agent 节点的配置和更新管理

## 应用包管理

### 应用包上传

```typescript
// 上传应用包
import { useAppPackage } from '@/hooks/useAppPackage'

const { uploadPackage, getPackageInfo } = useAppPackage()

const uploadResult = await uploadPackage({
  file: selectedFile,
  name: 'MyApp',
  version: '1.0.0',
  description: '应用描述',
  tags: ['测试', '开发'],
  platform: 'android' // android | ios | harmony
})
```

### 支持的应用包格式

**Android 应用包**
- **APK 文件**：标准的 Android 应用包
- **AAB 文件**：Android App Bundle 格式
- **多 APK**：支持多个 APK 文件的组合安装

**iOS 应用包**
- **IPA 文件**：iOS 应用包文件
- **企业签名**：企业证书签名的应用
- **开发者签名**：开发者证书签名的应用

**HarmonyOS 应用包**
- **HAP 文件**：HarmonyOS 应用包
- **APP 文件**：HarmonyOS 应用包集合

### 应用包信息解析

```typescript
// 获取应用包详细信息
const packageInfo = {
  name: 'com.example.myapp',
  displayName: 'My App',
  version: '1.0.0',
  versionCode: 1,
  platform: 'android',
  minSdkVersion: 21,
  targetSdkVersion: 30,
  permissions: [
    'android.permission.INTERNET',
    'android.permission.ACCESS_NETWORK_STATE'
  ],
  features: [
    'android.hardware.camera',
    'android.hardware.location'
  ],
  size: 10485760, // 字节
  md5: 'a1b2c3d4e5f6...',
  sha1: 'e1f2a3b4c5d6...',
  uploadTime: '2024-01-01T00:00:00Z',
  uploadBy: 'user@example.com'
}
```

### 应用包管理功能

**版本管理**
- 版本历史：查看应用包的版本历史
- 版本比较：比较不同版本的差异
- 版本回滚：回滚到特定版本
- 版本标签：为版本添加标签和描述

**分发管理**
- 批量安装：批量安装到多个设备
- 定时安装：定时安装任务
- 卸载管理：批量卸载应用
- 安装状态：实时查看安装状态

## 设备分组管理

### 创建设备分组

```typescript
// 创建设备分组
import { useDeviceGroup } from '@/hooks/useDeviceGroup'

const { createGroup, addDeviceToGroup } = useDeviceGroup()

// 创建静态分组
const staticGroup = await createGroup({
  name: 'Android 测试设备',
  description: '用于 Android 应用测试的设备',
  type: 'static',
  devices: ['device-1', 'device-2', 'device-3']
})

// 创建动态分组
const dynamicGroup = await createGroup({
  name: 'iOS 高端设备',
  description: '高端 iOS 设备',
  type: 'dynamic',
  rules: [
    {
      field: 'platform',
      operator: 'equals',
      value: 'ios'
    },
    {
      field: 'model',
      operator: 'in',
      value: ['iPhone 14', 'iPhone 15', 'iPad Pro']
    }
  ]
})
```

### 分组类型

**静态分组**
- 手动管理：手动添加和移除设备
- 固定成员：分组成员相对固定
- 适用场景：特定项目的专用设备

**动态分组**
- 规则驱动：基于设备属性自动分组
- 自动更新：设备属性变化时自动更新分组
- 适用场景：基于设备特征的分组

**混合分组**
- 规则+手动：结合规则和手动管理
- 灵活管理：可以在规则基础上手动调整
- 适用场景：大部分自动化但需要人工干预的场景

### 分组规则配置

```typescript
// 分组规则示例
const groupRules = {
  // 平台规则
  platformRule: {
    field: 'platform',
    operator: 'equals',
    value: 'android'
  },
  
  // 系统版本规则
  versionRule: {
    field: 'osVersion',
    operator: 'greaterThan',
    value: '10.0'
  },
  
  // 设备状态规则
  statusRule: {
    field: 'status',
    operator: 'in',
    value: ['online', 'idle']
  },
  
  // 自定义标签规则
  tagRule: {
    field: 'tags',
    operator: 'contains',
    value: 'test'
  }
}
```

## Agent 节点管理

### 节点注册

```typescript
// Agent 节点注册
import { useAgentNode } from '@/hooks/useAgentNode'

const { registerNode, getNodeStatus } = useAgentNode()

const nodeInfo = await registerNode({
  name: 'agent-node-01',
  host: '192.168.1.100',
  port: 8080,
  capacity: 10, // 最大设备数
  tags: ['android', 'high-performance'],
  location: 'beijing',
  description: '北京机房 Android 节点'
})
```

### 节点监控

**实时状态**
- 在线状态：节点是否在线
- 负载情况：当前负载和容量
- 性能指标：CPU、内存、网络使用情况
- 设备数量：连接的设备数量

**历史数据**
- 性能趋势：历史性能数据趋势
- 故障记录：故障和恢复记录
- 使用统计：使用时间和频率统计
- 健康评分：基于多项指标的健康评分

### 负载均衡

```typescript
// 负载均衡配置
const loadBalancer = {
  strategy: 'round-robin', // round-robin | least-connections | weighted
  healthCheck: {
    enabled: true,
    interval: 30, // 秒
    timeout: 5, // 秒
    retries: 3
  },
  failover: {
    enabled: true,
    maxFailures: 3,
    recoveryTime: 300 // 秒
  }
}
```

## 测试数据管理

### 测试数据上传

```typescript
// 上传测试数据
import { useTestData } from '@/hooks/useTestData'

const { uploadTestData, getTestDataList } = useTestData()

const testData = await uploadTestData({
  name: '用户登录测试数据',
  type: 'csv', // csv | json | xml | excel
  file: selectedFile,
  description: '包含各种用户登录场景的测试数据',
  tags: ['登录', '用户管理']
})
```

### 数据格式支持

**CSV 格式**
```csv
username,password,expected_result
user1@example.com,password123,success
user2@example.com,wrongpassword,failed
user3@example.com,password456,success
```

**JSON 格式**
```json
{
  "testData": [
    {
      "username": "user1@example.com",
      "password": "password123",
      "expectedResult": "success"
    },
    {
      "username": "user2@example.com",
      "password": "wrongpassword",
      "expectedResult": "failed"
    }
  ]
}
```

**Excel 格式**
- 支持多个工作表
- 支持数据验证
- 支持公式和计算
- 支持图表和可视化

### 数据模板

```typescript
// 数据模板定义
const dataTemplates = {
  loginTemplate: {
    name: '登录测试数据模板',
    fields: [
      {
        name: 'username',
        type: 'string',
        required: true,
        validation: 'email'
      },
      {
        name: 'password',
        type: 'string',
        required: true,
        minLength: 6
      },
      {
        name: 'expectedResult',
        type: 'enum',
        options: ['success', 'failed', 'error']
      }
    ]
  }
}
```

## 文件管理

### 设备文件操作

```typescript
// 设备文件管理
import { useDeviceFile } from '@/hooks/useDeviceFile'

const { uploadFile, downloadFile, listFiles } = useDeviceFile()

// 上传文件到设备
await uploadFile({
  deviceId: 'device-123',
  localPath: '/path/to/local/file.txt',
  remotePath: '/sdcard/test/file.txt'
})

// 从设备下载文件
await downloadFile({
  deviceId: 'device-123',
  remotePath: '/sdcard/test/file.txt',
  localPath: '/path/to/local/file.txt'
})

// 列出设备文件
const files = await listFiles({
  deviceId: 'device-123',
  path: '/sdcard/test/'
})
```

### 批量文件操作

```typescript
// 批量文件操作
const batchOperations = {
  // 批量上传
  batchUpload: async (operations) => {
    const results = await Promise.all(
      operations.map(op => uploadFile(op))
    )
    return results
  },
  
  // 批量下载
  batchDownload: async (operations) => {
    const results = await Promise.all(
      operations.map(op => downloadFile(op))
    )
    return results
  },
  
  // 批量删除
  batchDelete: async (operations) => {
    const results = await Promise.all(
      operations.map(op => deleteFile(op))
    )
    return results
  }
}
```

## 权限管理

### 资源权限

```typescript
// 资源权限配置
const resourcePermissions = {
  appPackages: {
    read: ['admin', 'tester', 'developer'],
    write: ['admin', 'developer'],
    delete: ['admin']
  },
  deviceGroups: {
    read: ['admin', 'tester', 'developer'],
    write: ['admin', 'tester'],
    delete: ['admin']
  },
  agentNodes: {
    read: ['admin'],
    write: ['admin'],
    delete: ['admin']
  },
  testData: {
    read: ['admin', 'tester', 'developer'],
    write: ['admin', 'tester', 'developer'],
    delete: ['admin', 'tester']
  }
}
```

### 用户角色

**管理员 (Admin)**
- 全部权限：所有资源的完全控制权限
- 用户管理：管理用户账户和权限
- 系统配置：修改系统配置和设置

**测试工程师 (Tester)**
- 测试资源：管理测试相关资源
- 设备使用：使用和管理设备
- 报告查看：查看测试报告和数据

**开发人员 (Developer)**
- 应用管理：管理应用包和版本
- 设备使用：使用设备进行开发调试
- 数据访问：访问测试数据和日志

## 资源监控

### 使用统计

```typescript
// 资源使用统计
const resourceStats = {
  appPackages: {
    total: 156,
    activeToday: 23,
    mostUsed: 'com.example.myapp',
    storageUsed: '2.5GB'
  },
  deviceGroups: {
    total: 12,
    activeGroups: 8,
    largestGroup: 'Android 测试设备',
    averageSize: 15
  },
  agentNodes: {
    total: 5,
    online: 4,
    totalCapacity: 50,
    utilizationRate: 0.72
  }
}
```

### 性能监控

```typescript
// 性能监控指标
const performanceMetrics = {
  // 应用包性能
  packageMetrics: {
    uploadSpeed: '10MB/s',
    downloadSpeed: '15MB/s',
    installSuccess: 0.95,
    installTime: '45s'
  },
  
  // 设备分组性能
  groupMetrics: {
    queryTime: '200ms',
    updateTime: '100ms',
    ruleEvaluation: '50ms'
  },
  
  // Agent 节点性能
  nodeMetrics: {
    responseTime: '100ms',
    throughput: '1000/min',
    errorRate: 0.001,
    availability: 0.999
  }
}
```

## 最佳实践

### 资源组织

1. **分层管理**：按项目、环境、功能分层管理资源
2. **标签体系**：建立统一的标签体系便于搜索和过滤
3. **权限最小化**：遵循最小权限原则分配资源权限
4. **定期清理**：定期清理不使用的资源避免浪费

### 性能优化

1. **缓存策略**：合理使用缓存减少重复操作
2. **批量操作**：使用批量操作提高效率
3. **异步处理**：使用异步处理避免阻塞
4. **资源池**：使用资源池管理重复使用的资源

### 安全管理

1. **访问控制**：严格的访问控制和权限管理
2. **数据加密**：敏感数据的加密存储和传输
3. **审计日志**：完整的操作审计日志
4. **备份恢复**：定期备份和恢复策略

## 故障处理

### 常见问题

**应用包上传失败**
- 检查文件格式和大小
- 确认网络连接状态
- 验证权限设置
- 查看错误日志

**设备分组不生效**
- 检查分组规则配置
- 验证设备属性数据
- 确认规则执行频率
- 检查权限设置

**Agent 节点离线**
- 检查网络连接
- 验证节点配置
- 查看节点日志
- 重启节点服务

### 故障恢复

1. **自动恢复**：系统自动检测和恢复常见故障
2. **手动恢复**：提供手动恢复工具和流程
3. **故障转移**：自动切换到备用资源
4. **数据恢复**：从备份恢复丢失的数据

## API 接口

### 应用包管理 API

```typescript
// 应用包管理 API
interface AppPackageAPI {
  // 上传应用包
  uploadPackage(file: File, metadata: PackageMetadata): Promise<PackageInfo>
  
  // 获取应用包列表
  getPackageList(filters?: PackageFilters): Promise<PackageInfo[]>
  
  // 删除应用包
  deletePackage(packageId: string): Promise<void>
  
  // 安装应用包
  installPackage(packageId: string, deviceIds: string[]): Promise<InstallResult>
}
```

### 设备分组 API

```typescript
// 设备分组 API
interface DeviceGroupAPI {
  // 创建分组
  createGroup(group: GroupConfig): Promise<GroupInfo>
  
  // 获取分组列表
  getGroupList(): Promise<GroupInfo[]>
  
  // 更新分组
  updateGroup(groupId: string, updates: Partial<GroupConfig>): Promise<GroupInfo>
  
  // 删除分组
  deleteGroup(groupId: string): Promise<void>
}
```

这个完整的资源管理系统为 High QA 平台提供了统一、高效的资源管理能力，确保所有测试资源的有序管理和高效利用。 