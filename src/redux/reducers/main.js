import { 
  GO_TO_PAGE,
  DISPLAY_MAIN_LOADING,
  UPDATE_INIT_DATAREF,
  CHANGE_PRICE_ACTIVE_TYPE,
  CREATE_PRICE_FORM_DATA,
  EDIT_PRICE_CREATE,
  CANCEL_EDIT_PRICE,
  UPDATE_PRICE_CHANGED,
  UPDATE_REF_MAIN_STRUCTURE,
  UPDATE_REF_SUB_STRUCTURE
} from '../actions/main'
import { config } from '../../Constants'
const initialState = {
    urlRef:  {
        base: config.url.BASE_URL,
        imgPath: config.url.IMG_PATH
    },
    main_loading: false,
    current_page: 'main_menu',
    login: {
        username: "",
        password: "",
        status: false,
        data: null
    },
    initDataRef: {},
    priceForm: {
      typeActive: 'aluminium',
      aluminium: {
        data: []
      },
      glass: {
        data: []
      },
      edit: {
        data: {}
      }
    }
}

export default function main(state = initialState, action){
    switch (action.type) {
        case GO_TO_PAGE: {
          return {
            ...state,
            current_page: action.page
          }
        }
        case DISPLAY_MAIN_LOADING: {
          return {
            ...state,
            main_loading: action.display
          }
        }
        case UPDATE_INIT_DATAREF: {
          return {
            ...state,
            initDataRef: action.payload
          }
        }// end case UPDATE_INIT_DATAREF
        case UPDATE_REF_MAIN_STRUCTURE: {
          return {
            ...state,
            initDataRef: {
              ...state.initDataRef,
              aMainStructure: action.payload
            }
          }
        }// end case UPDATE_REF_MAIN_STRUCTURE
        case UPDATE_REF_SUB_STRUCTURE: {
          return {
            ...state,
            initDataRef: {
              ...state.initDataRef,
              aSubStructure: action.payload
            }
          }
        }// end case UPDATE_REF_SUB_STRUCTURE
        case CHANGE_PRICE_ACTIVE_TYPE: {
          return {
            ...state,
            priceForm: {
              ...state.priceForm,
              typeActive: action.payload
            }
          }
        }
        case CREATE_PRICE_FORM_DATA: {
          return {
            ...state,
            priceForm: {
              ...state.priceForm,
              [action.payload.key]: {
                ...state.priceForm[action.payload.key],
                data: action.payload.data
              }
            }
          }
        }// end case CREATE_PRICE_FORM_DATA
        case EDIT_PRICE_CREATE: {
          return {
            ...state,
            priceForm: {
              ...state.priceForm,
              edit: {
                ...state.priceForm.edit,
                data: {
                  ...state.priceForm.edit.data,
                  [action.payload.key]: action.payload.value
                }
              }
            }
          }
        }// end case EDIT_PRICE_CREATE
        case UPDATE_PRICE_CHANGED: {
          return {
            ...state,
            priceForm: {
              ...state.priceForm,
              edit: {
                ...state.priceForm.edit,
                data: {
                  ...state.priceForm.edit.data,
                  [action.payload.key]: action.payload.value
                }
              }
            }
          }
        }// end case UPDATE_PRICE_CHANGED
        case CANCEL_EDIT_PRICE: { 
          return {
            ...state,
            priceForm: {
              ...state.priceForm,
              edit: {
                ...state.priceForm.edit,
                data: {}
              }
            }
          }
        }// end case CANCEL_EDIT_PRICE
        default: return state;
    }// end switch
}