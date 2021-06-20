import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home"
import EditText from "../components/EditText";
import ProjectList from "../components/ProjectList";
import Quiz from "../components/Quiz";
import About from "../components/About";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect : '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name:'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/edittext',
    name: 'EditText',
    component: EditText
  },
  {
    path: '/projectlist',
    name: 'ProjectList',
    component: ProjectList
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
