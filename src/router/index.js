import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Tags from '@/components/Tags'
import Scenes from '@/components/Scenes'
import Movies from '@/components/Movies'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/tags',
      name: 'Tags',
      component: Tags
    },
    {
      path: '/scenes',
      name: 'Scenes',
      component: Scenes
    },
    {
      path: '/movies',
      name: 'Movies',
      component: Movies
    }
  ]
})
