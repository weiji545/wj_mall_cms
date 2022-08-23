import { IBreadcrumb } from '@/base-ui/breadcrumb/types'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null
export default function mapMenu(routeMenu: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 加载所有routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // 根据菜单获取需要添加的routes
  const getRoutes = (menus: any[]) => {
    for (const item of menus) {
      if (item.type === 2) {
        const route = allRoutes.find((r) => r.path === item.url)
        if (route) {
          routes.push(route)
        }
        if (!firstMenu) {
          firstMenu = route
        }
      } else {
        getRoutes(item.children)
      }
    }
  }
  getRoutes(routeMenu)
  return routes
}

export function getBreadcrumbs(useMenu: any[], currentPath: string) {
  const breadcrumb: IBreadcrumb[] = []
  getActivePath(useMenu, currentPath, breadcrumb)
  return breadcrumb
}
export function getActivePath(
  useMenu: any[],
  currentPath: string,
  breadcrumb?: IBreadcrumb[]
): any {
  for (const item of useMenu) {
    if (item.type === 1) {
      const route = getActivePath(item.children ?? [], currentPath)
      if (route) {
        breadcrumb?.push({ name: item.name })
        breadcrumb?.push({ name: route.name, path: route.url })
        return route
      }
    } else if (item.type === 2 && item.url === currentPath) {
      return item
    }
  }
}

export function getPermission(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}

export function getMenuLeaf(menuList: any[]) {
  const leafList: number[] = []
  function recurseGetCheck(menuList: any[]) {
    for (const item of menuList) {
      if (item.children) {
        recurseGetCheck(item.children)
      } else {
        leafList.push(item.id)
      }
    }
  }
  recurseGetCheck(menuList)
  return leafList
}
export { firstMenu }
