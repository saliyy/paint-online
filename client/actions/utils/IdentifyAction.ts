import IAction from "../IAction";

export const identifyAction = async (action: IAction): Promise<IAction | null> => {
    let module = await import(`../concrete-actions/${action.method}.ts`)

    if (!module) {
        throw new Error("module not found")
    }

    return new module.default(action.payload)
}
