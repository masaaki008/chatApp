import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import {credentials} from "@/firebase/credentials";
import {initializeApp} from "firebase/app";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";
import ChatsMenu from "@/views/ChatsMenu.vue";
import Chat from "@/views/Chat.vue";

initializeApp(credentials.config);

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/sign_up',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/chats_menu',
        name: 'ChatsMenu',
        component: ChatsMenu,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/chat/:chatId',
        name: 'Chat',
        component: Chat,
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

const auth = getAuth();
const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
};

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(recode => recode.meta.requiresAuth);
    if (requiresAuth && !(await getCurrentUser())) {
        next({path: '/login'});
    } else {
        next();
    }
})

export default router
