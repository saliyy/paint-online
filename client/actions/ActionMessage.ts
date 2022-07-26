import {User} from "~/store/userStore";

export default interface ActionMessage {
    message: string

    author: User

    showInCanvasActionBar: boolean;

    showInActivityWindow: boolean;

    createdAt: Date
}