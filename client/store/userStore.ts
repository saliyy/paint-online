import { defineStore } from 'pinia'
import makeId from '@/utils/randomId';

export interface User {
    id?: number | string,
    name: string;
    disabled?: false
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
            this.user.id = makeId()
            this.isAuth = true
        }
    },
    getters: {
        userIsAuth(): boolean {
            return this.isAuth
        },
        getUser(): User | null {
            return this.user
        }
    }
})
