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
