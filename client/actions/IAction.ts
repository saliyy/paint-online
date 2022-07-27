import {User} from "~/store/userStore";


export default interface IAction {
    readonly method: string
    user?: User,
    payload: any
    message?: string
    receive(payload: any): void
    send(): Promise<void>
}