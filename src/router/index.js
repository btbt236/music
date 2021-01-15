import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import search from '../views/Search.vue'
import Review from '../views/Review.vue'
// import Playlist from '../views/Playlist.vue'



Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"Review",
    component:Review,
    meta: { isShowNav: true },
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { isShowNav: true },
  },
  {
    path: '/search',
    name: 'About', 
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: search,
    meta: { isShowNav: true },
  },
  {
    // path:'/Playlist',
    // name:'Playlist',
    // component: Playlist
    path:'/playlist',
    name:'Playlist',
    component: () => import("../views/Playlist.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
