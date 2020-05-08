import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo from "./components/Demo";
import Posts from "./components/Posts";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import NotFound from './components/NotFound'
// import { AclRule } from 'vue-acl'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    base: "/",
    routes: [
        {
            path: "/",
            component: Demo,
            name: "demo",
            children: [
                {
                    path: "list/:id",
                    components: { posts: Posts },
                    name: "posts",
                    // meta: {
                    //     rule: 'isLogged'
                    // }
                }
            ],
            // meta: {
            //     rule: 'isLogged'
            // }
        },
        {
            path: '/login',
            component: Login,
            name: "login",
            // meta: {
            //     rule: 'isPublic'
            // }
        },
        {
            path: "/signup",
            component: Signup,
            name: "signup",
            // meta: {
            //     rule: 'isPublic'
            // }
        },
        {
            path: '/error',
            name: 'notfound',
            component: NotFound,
            // meta: {
            //     rule: '*'
            // }
        },
        {
            path: '*',
            redirect: '/error'
        }
    ]
});

router.beforeEach((to, from, next) => {
    console.log('accessToken: ', localStorage.getItem("accessToken"))
    console.log(to.name)
    if (to.name !== 'login' && to.name !== 'signup' && !localStorage.getItem("accessToken")) next({ name: 'login' })
    else next()
})

export default router