import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MealDetail from '../views/MealDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meal/:idMeal',
      name: 'Meal',
      component: MealDetail
    }
  ]
})

export default router