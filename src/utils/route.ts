import { useRoute } from 'vue-router'
import { computed } from 'vue'

/**
 * 获取当前路由的icon
 * @param defaultIcon 默认icon，如果路由meta中没有配置icon则使用此值
 * @returns 当前路由的icon
 */
export function useRouteIcon(defaultIcon: string = 'mdi-help') {
  const route = useRoute()

  return computed(() => {
    return (route.meta?.icon as string) || defaultIcon
  })
}

/**
 * 获取当前路由的title
 * @param defaultTitle 默认title，如果路由meta中没有配置title则使用此值
 * @returns 当前路由的title
 */
export function useRouteTitle(defaultTitle: string = '页面') {
  const route = useRoute()

  return computed(() => {
    return (route.meta?.title as string) || defaultTitle
  })
}

/**
 * 获取当前路由的description
 * @param defaultDescription 默认description，如果路由meta中没有配置description则使用此值
 * @returns 当前路由的description
 */
export function useRouteDescription(defaultDescription: string = '') {
  const route = useRoute()

  return computed(() => {
    return (route.meta?.description as string) || defaultDescription
  })
}

/**
 * 获取当前路由的category
 * @param defaultCategory 默认category，如果路由meta中没有配置category则使用此值
 * @returns 当前路由的category
 */
export function useRouteCategory(defaultCategory: string = '') {
  const route = useRoute()

  return computed(() => {
    return (route.meta?.category as string) || defaultCategory
  })
}

/**
 * 获取当前路由的所有meta信息
 * @returns 当前路由的完整meta对象
 */
export function useRouteMeta() {
  const route = useRoute()

  return computed(() => {
    return route.meta
  })
}
