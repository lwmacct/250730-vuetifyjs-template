/**
 * 工具函数库
 * 用于存放项目中使用的通用工具函数
 */

/**
 * 格式化日期
 * @param date - 日期对象或日期字符串
 * @param format - 格式化模式，默认 'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 防抖函数
 * @param func - 需要防抖的函数
 * @param delay - 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

/**
 * 深拷贝对象
 * @param obj - 要拷贝的对象
 * @returns 深拷贝后的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T
  }

  const cloned = {} as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key])
    }
  }

  return cloned
}

/**
 * 生成UUID
 * @returns UUID字符串
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 页面标题管理配置
 */
export interface TitleConfig {
  /** 默认标题 */
  defaultTitle?: string
  /** 应用名称后缀 */
  appName?: string
  /** 标题分隔符 */
  separator?: string
  /** 是否显示应用名称 */
  showAppName?: boolean
  /** 标题模板，{title} 和 {appName} 会被替换 */
  template?: string
}

/**
 * 页面标题管理器
 */
export class PageTitleManager {
  private config: Required<TitleConfig>

  constructor(config: TitleConfig = {}) {
    this.config = {
      defaultTitle: 'Vue + Vuetify 演示应用',
      appName: 'Vue + Vuetify Console',
      separator: ' - ',
      showAppName: true,
      template: '{title}{separator}{appName}',
      ...config,
    }
  }

  /**
   * 设置页面标题
   * @param title - 页面标题
   * @param options - 临时配置选项
   */
  setTitle(title?: string, options: Partial<TitleConfig> = {}) {
    const finalTitle = title || this.config.defaultTitle
    const tempConfig = { ...this.config, ...options }

    if (!tempConfig.showAppName) {
      document.title = finalTitle
      return finalTitle
    }

    const formattedTitle = tempConfig.template
      .replace('{title}', finalTitle)
      .replace('{separator}', tempConfig.separator)
      .replace('{appName}', tempConfig.appName)

    document.title = formattedTitle
    return formattedTitle
  }

  /**
   * 更新配置
   * @param config - 新的配置
   */
  updateConfig(config: Partial<TitleConfig>) {
    this.config = { ...this.config, ...config }
  }

  /**
   * 获取当前配置
   */
  getConfig(): Required<TitleConfig> {
    return { ...this.config }
  }

  /**
   * 重置为默认配置
   */
  resetConfig() {
    this.config = {
      defaultTitle: 'Vue + Vuetify 演示应用',
      appName: 'Vue + Vuetify Console',
      separator: ' - ',
      showAppName: true,
      template: '{title}{separator}{appName}',
    }
  }
}

// 创建默认的页面标题管理器实例
export const pageTitleManager = new PageTitleManager()

/**
 * 设置页面标题的快捷函数
 * @param title - 页面标题
 * @param options - 临时配置选项
 */
export const setPageTitle = (title?: string, options: Partial<TitleConfig> = {}) => {
  return pageTitleManager.setTitle(title, options)
}
