import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import search from '../views/search.vue'
import Review from '../views/Review.vue'
import Playlist from '../views/Playlist.vue'



Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"Review",
    component:Review,
    
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/search',
    name: 'About', 
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: search
  },
  {
    path:'/Playlist',
    name:'Playlist',
    component: Playlist

  }
]

const router = new VueRouter({
  routes
})

export default router
