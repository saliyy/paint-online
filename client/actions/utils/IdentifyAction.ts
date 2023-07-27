import IAction from '~~/actions/Action'

export const identifyAction = async (action: IAction): Promise<IAction> => {
    const module = await import(`../concrete-actions/${action.method}.ts`)

    if (!module) {
        throw new Error("module not found")
    }

    return new module.default(action.payload)
}
