export default interface ActionMessage {
    text: string

    showInCanvasActionBar: boolean;

    showInActivityWindow: boolean;

    createdAt?: Date
}