import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 //当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 hidden: true // (默认 false)

 //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 redirect: 'noRedirect'

 //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 //只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 //若你想不管路由下面的 children 声明的个数都显示你的根路由
 //你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 alwaysShow: true

 name: 'router-name' //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 meta: {
  roles: ['admin', 'editor'] //设置该路由进入的权限，支持多个权限叠加
  title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' //设置该路由的图标
  noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
  affix: false                // 固钉 v3.10.0+ 当在声明路由是 添加了 Affix 属性，则当前tag会被固定在 tags-view中（不可被删除）
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
    }]
  },
  {
    path: '/temp',
    component: Layout,
    redirect: '/temp/icons',
    name: '参考模板',
    meta: {
      title: '参考模板',
      icon: 'star' // 图标
    },
    children: [
      {
        path: 'icons',
        component: () => import('@/views/temp/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      },
      {
        path: 'keyboard',
        component: () => import('@/views/temp/charts/keyboard'),
        name: 'KeyboardChart',
        meta: { title: 'Keyboard Chart', noCache: false }
      },
      {
        path: 'line',
        component: () => import('@/views/temp/charts/line'),
        name: 'LineChart',
        meta: { title: 'Line Chart', noCache: true }
      },
      {
        path: 'mix-chart',
        component: () => import('@/views/temp/charts/mix-chart'),
        name: 'MixChart',
        meta: { title: 'Mix Chart', noCache: true }
      }
    ]
  }
]
export const asyncRoutes = [
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/user',
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'sys' // 图标
    },
    children: [
      {
        path: '/sys/user',
        component: () => import('@/views/sys/user/index'),
        name: '用户管理',
        meta: { title: '用户管理', roles: ['sys:user:read'] }
      },
      {
        path: '/sys/menu',
        component: () => import('@/views/sys/menu/index'),
        name: '菜单管理',
        meta: { title: '菜单管理', roles: ['sys:menu:read'] }
      },
      {
        path: '/sys/role',
        component: () => import('@/views/sys/role/index'),
        name: '角色管理',
        meta: { title: '角色管理', roles: ['sys:role:read'] }
      },
      {
        path: '/sys/config',
        component: () => import('@/views/sys/config/index'),
        name: '参数配置',
        meta: { title: '参数配置', roles: ['sys:config:read'] }
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    redirect: '/monitor/online',
    name: '运维管理',
    meta: {
      title: '运维管理',
      icon: 'sys' // 图标
    },
    children: [
      {
        path: '/monitor/online',
        component: () => import('@/views/monitor/online/index'),
        name: '在线用户',
        meta: { title: '在线用户' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
