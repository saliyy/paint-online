export default interface ActionMessage {
    id: number | string,
    
    text: string

    showInCanvasActionBar: boolean;

    showInActivityWindow: boolean;

    createdAt?: string
}