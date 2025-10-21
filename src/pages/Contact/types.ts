/**
 * Contact 页面相关的类型定义
 */

/**
 * 联系信息项接口
 */
export interface ContactItem {
  id: string
  icon: string
  title: string
  subtitle: string
}

/**
 * Contact 页面数据接口
 */
export interface ContactPageData {
  pageTitle: string
  pageIcon: string
  description: string
  contacts: ContactItem[]
}
