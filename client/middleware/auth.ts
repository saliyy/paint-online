import { useUserStore } from "@/store/userStore"

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.fullPath != '/' && !useUserStore().userIsAuth) {
        return navigateTo({ path: '/'})
    }
})