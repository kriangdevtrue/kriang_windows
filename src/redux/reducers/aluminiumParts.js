import {
  DISPLAY_MODAL_NEW,
  UPDATE_ALUMINIUM_PARTS,
  UPDATE_FORM_INPUT,
  RESET_FORM_INPUTS
} from '../actions/aluminiumParts'
import { config } from '../../Constants'
const initialState = {
  modalNew: {
    display: false,
    form: {
      key: '',
      name: ''
    }
  },
  list: {
    data: []
  }
}

export default function aluminiumParts(state = initialState, action){
    switch (action.type) {
        case DISPLAY_MODAL_NEW: {
          return {
            ...state,
            modalNew: {
              ...state.modalNew,
              display: action.display
            }
          }
        }
        case UPDATE_ALUMINIUM_PARTS: {
          return {
            ...state,
            list: {
              ...state.list,
              data: action.payload
            }
          }
        }
        case UPDATE_FORM_INPUT: {
          return {
            ...state,
            modalNew: {
              ...state.modalNew,
              form: {
                ...state.modalNew.form,
                [action.payload.keyRef]: action.payload.value
              }
            }
          }
        }
        case RESET_FORM_INPUTS: {
          return {
            ...state,
            modalNew: {
              ...state.modalNew,
              form: {
                ...state.modalNew.form,
                key: '',
                name: ''
              }
            }
          }
        }
        default: return state;
    }// end switch
}