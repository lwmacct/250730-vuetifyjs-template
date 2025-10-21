/**
 * About 页面相关的类型定义
 */

/**
 * 技术栈项接口
 */
export interface TechStackItem {
  id: string
  icon: string
  title: string
  subtitle: string
}

/**
 * About 页面数据接口
 */
export interface AboutPageData {
  pageTitle: string
  pageIcon: string
  description: string
  techStack: TechStackItem[]
}
