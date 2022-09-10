import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  // Produtos
  {
    path: '/listar-produto',
    name: 'ListarProduto',
    component: () => import('@/components/produtos/ListarProduto.vue')
  },
  {
    path: '/cadastrar-produto',
    name: 'CadastrarProduto',
    component: () => import('@/components/produtos/CadastrarProduto.vue')
  },
  {
    path: '/editar-produto/:id',
    name: 'EditarProduto',
    component: () => import('@/components/produtos/EditarProduto.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
