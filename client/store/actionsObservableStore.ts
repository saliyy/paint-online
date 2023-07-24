import { defineStore } from 'pinia'
import { Observable, Subject } from 'rxjs'
import IAction from '~~/actions2/actions/Action'


export type ActionName = string

/**
 * Rxjs based observer for actions
 */
export const useActionObservableStore = defineStore('actionsObserverable', () => {
    const subscribers = new Map<ActionName, Subject<IAction>>()

    function emit(action: IAction): void {
        const actionName = action.constructor.name

        if (subscribers.has(actionName)) {

            const observeSubscriber = subscribers.get(actionName)

            observeSubscriber.next(action)
        }
    }

    function getSubjectOf(action: Function): Observable<IAction> {         
        
        if (!subscribers.has(action.name)) {

            const observeSubject = new Subject<IAction>();

            subscribers.set(action.name, observeSubject);

            return observeSubject.asObservable()
        } 
        return subscribers.get(action.name)
    }


    return {
        emit, getSubjectOf
    }
    
})