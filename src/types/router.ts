// 扩展Vue Router的RouteMeta接口
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    icon?: string
    // 自定义字段
    description?: string
    keywords?: string[]
    category?: string
    priority?: number
    showInMenu?: boolean
    requireAuth?: boolean
    [key: string]: any
  }
}
