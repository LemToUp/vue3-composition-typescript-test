import { createStore } from 'vuex'
import Element from '@/interfaces/Element'
import Action from '@/interfaces/Action'
import getElementsRequest from '@/api/elements'
import {
  ADD_ELEMENT,
  ADD_HISTORY_ACTION,
  GET_ELEMENTS,
  REMOVE_ELEMENT,
  SET_ELEMENTS, SET_IS_ELEMENTS_LOADED,
  SET_IS_ELEMENTS_LOADING
} from '@/store/actions'

export default createStore({
  state: {
    elements: Array<Element>(),
    isElementsLoading: false,
    isElementsLoaded: false,
    selectedElements: Array<Element>(),
    history: Array<Action>()
  },
  getters: {
    elementsOrdered: state => {
      return state.elements.sort((firstEl: Element, secondEl: Element): number => {
        if (firstEl.id > secondEl.id) return 1
        if (firstEl.id < secondEl.id) return -1
        return 0
      })
    },
    selectedElementsOrdered: state => {
      return state.selectedElements.sort((firstEl: Element, secondEl: Element): number => {
        if (firstEl.id > secondEl.id) return 1
        if (firstEl.id < secondEl.id) return -1
        return 0
      })
    }
  },
  mutations: {
    [SET_ELEMENTS] (state, elements: Array<Element>): void {
      state.elements = elements
    },
    [SET_IS_ELEMENTS_LOADING] (state, status: boolean): void {
      state.isElementsLoading = status
    },
    [SET_IS_ELEMENTS_LOADED] (state, status: boolean): void {
      state.isElementsLoaded = status
    },
    [ADD_ELEMENT] (state, elementId: number): void {
      const index: number = state.elements.findIndex(element => element.id === elementId)
      if (index !== -1) {
        const element: Element = state.elements.splice(index, 1)[0]
        state.selectedElements.push(element)
      }
    },
    [REMOVE_ELEMENT] (state, elementId: number): void {
      const index: number = state.selectedElements.findIndex(element => element.id === elementId)
      if (index !== -1) {
        const element: Element = state.selectedElements.splice(index, 1)[0]
        state.elements.push(element)
      }
    },
    [ADD_HISTORY_ACTION] (state, payload: {type: string; elementId: number}): void {
      const { type, elementId } = payload
      const element = [...state.elements, ...state.selectedElements].find(element => element.id === elementId)

      if (element) {
        const action: Action = {
          id: state.history.length + 1,
          type: type,
          element: element,
          date: new Date().toISOString()
        }

        state.history.push(action)
      }
    }
  },
  actions: {
    [GET_ELEMENTS] (context, entity: number): void {
      context.commit(SET_IS_ELEMENTS_LOADING, true)
      getElementsRequest(entity).then(elements => {
        context.commit(SET_ELEMENTS, elements)
        context.commit(SET_IS_ELEMENTS_LOADED, true)
      }).finally(() => context.commit(SET_IS_ELEMENTS_LOADING, false))
    },
    [ADD_ELEMENT] (context, elementId: number): void {
      context.commit(ADD_ELEMENT, elementId)
      context.commit(ADD_HISTORY_ACTION, { type: 'add', elementId: elementId })
    },
    [REMOVE_ELEMENT] (context, elementId: number): void {
      context.commit(REMOVE_ELEMENT, elementId)
      context.commit(ADD_HISTORY_ACTION, { type: 'remove', elementId: elementId })
    }
  }
})
