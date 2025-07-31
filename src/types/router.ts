// 扩展Vue Router的RouteMeta接口
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    icon?: string
    [key: string]: any
  }
}
