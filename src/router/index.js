import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/table',
    name: 'User',
    meta: { roles: ['superAdmin'], title: '通用管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/views/tree/index'),
        meta: { title: '权限管理', icon: 'lock' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    meta: { roles: ['user'], title: '普通' },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: 'article',
    meta: {
      title: '谱子',
      icon: 'documentation'
    },
    children: [
      { path: 'create', component: () => import('@/views/example/create'), name: 'createArticle', meta: { title: '新建谱子', icon: 'edit' }},
      { path: 'edit/:id(\\d+)', component: () => import('@/views/example/edit'), name: 'editArticle', meta: { title: '编辑谱子', noCache: true }, hidden: true },
      { path: 'list', component: () => import('@/views/example/list'), name: 'articleList', meta: { title: '谱子列表', icon: 'list' }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

