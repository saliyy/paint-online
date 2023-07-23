import { Payload } from "~~/actions/Action";
import ActionMessage from "~~/actions/ActionMessage";
import { User } from "~~/store/userStore";

export default interface IAction { 
    readonly method: string;
    user: User;
    payload: Payload
    message?: ActionMessage,
}