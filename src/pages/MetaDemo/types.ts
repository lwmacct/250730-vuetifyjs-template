/**
 * MetaDemo 页面相关的类型定义
 */

/**
 * Meta字段项接口
 */
export interface MetaFieldItem {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

/**
 * 路由Meta配置接口
 */
export interface RouteMeta {
  title?: string
  icon?: string
  description?: string
  keywords?: string[]
  category?: string
  priority?: number
  showInMenu?: boolean
  requireAuth?: boolean
  [key: string]: any
}

/**
 * MetaDemo 页面数据接口
 */
export interface MetaDemoPageData {
  pageTitle: string
  pageIcon: string
  metaFields: MetaFieldItem[]
}
