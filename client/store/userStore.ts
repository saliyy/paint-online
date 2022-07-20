import { defineStore } from 'pinia'

export interface User {
    id: number | string,
    name: string;
    disabled: false
}

/*
 Used when user is connected
*/
export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: null as User,
        isAuth: false
    }),
    actions: {
        setUser(user: User) {
            this.user = user
        }
    },
    getters: {
        isAuth(): boolean {
            return this.isAuth === true
        }
    }
})
