import Vue from 'vue'
import VueRouter from 'vue-router'
const map = () => import('../components/map');
const map_views = () => import('../components/map_views');
const login = () => import('../components/login');
const online = () => import('../components/online');
const register = () => import('../components/register');
const forget_password = () => import('../components/forget_password');
const correctPassword = () => import('../components/correctPassword');
const remark_section = () => import('../components/remark_section');
const user_area = () => import('../components/user_area');
const change_name = () => import('../components/change_name');
const change_phone = () => import('../components/change_phone');
const change_password = () => import('../components/change_password');
const option_menu = () => import('../components/option_menu');
const verify_password = () => import('../components/verify_password');
const more_comments = () => import('../components/more_comments');
const all_comments = () => import('../components/all_comments');
const img_comments = () => import('../components/img_comments');
const lasted_comments = () => import('../components/lasted_comments');
const negative_comments = () => import('../components/negative_comments');
const manage_store = () => import('../components/manage_store');
const store_detail = () => import('../components/store_detail');
const message_login = () => import('../components/message_login')

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path:'/',
      redirect:'/map_views'
    },
    {
      path: '/map',
      component:map
    },
    {
      path: '/map_views',
      component:map_views,
      name:'map_views'
    },
    {
      path:'/more_comments',
      component:more_comments,
      children:[
        {
          path:'/',
          redirect:'all_comments'
        },
        {
          path:'all_comments',
          component:all_comments
        },
        {
          path:'img_comments',
          component:img_comments
        },
        {
          path:'lasted_comments',
          component:lasted_comments
        },
        {
          path:'negative_comments',
          component:negative_comments
        },
      ]
    },
    {
      path: '/remark_section',
      component: remark_section,
      name:'remark_section'
    },
    {
      path:'/store_detail',
      component: store_detail
    },
    {
      path:'/user_area',
      component: user_area,
      children:[
        {
          path: '/',
          redirect: 'option_menu'
        },
        {
          path: 'option_menu',
          component: option_menu,
        },
        {
          path:'option_menu/change_name',
          component: change_name
        },
        {
          path: 'option_menu/verify_password',
          component: verify_password,
        },
        {
          path:'option_menu/verify_password/change_phone',
          component: change_phone
        },
        {
          path:'option_menu/verify_password/change_password',
          component: change_password
        },
        {
          path: 'option_menu/verify_password/manage_store',
          component: manage_store
        }
      ]
    },
    {
      path:'/online',
      component:online,
      children:[
        {
          path:'/' ,
          redirect:'login'
        },
        {
          path: 'login',
          component:login
        },
        {
          path:'register',
          component:register
        },
        {
          path:'forget_password',
          component:forget_password
        },
        {
          path:'correct_password',
          name:'correctPassword',
          component:correctPassword
        },
        {
          path:'message_login',
          component:message_login
        }
      ]
    }
  ],
  /*mode:'history'*/
})
