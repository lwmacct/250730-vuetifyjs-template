/**
 * AppHeader 组件相关的类型定义
 */

/**
 * 头部组件属性接口
 */
export interface Props {
  // 标题相关
  title?: string
  titleIcon?: string
  showTitle?: boolean

  // 导航图标相关
  showNavIcon?: boolean
  navIcon?: string
  navIconColor?: string
  onNavIconClick?: () => void

  // 抽屉菜单相关
  showDrawer?: boolean
  drawerWidth?: number | string

  // 其他
  elevation?: number | string
  color?: string
  height?: number | string

  // 自定义内容相关
  useCustomContent?: boolean
}

/**
 * 菜单项接口（基础版本，复杂的路由菜单项在 stores 中定义）
 */
export interface MenuItem {
  id: string
  title: string
  icon: string
  path: string
  category?: string
  isFavorite?: boolean
}

/**
 * 头部操作按钮接口
 */
export interface HeaderAction {
  icon: string
  text: string
  color: string
  variant: string
  onClick: () => void
}

/**
 * 抽屉菜单配置接口
 */
export interface DrawerConfig {
  width: number | string
  temporary: boolean
  color: string
  dark: boolean
}

/**
 * 悬停面板配置接口
 */
export interface HoverPanelConfig {
  minWidth: number
  maxWidth: number
  backgroundColor: string
  borderColor: string
  showAnimation: boolean
}
