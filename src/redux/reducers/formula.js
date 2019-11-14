import { 
  UPDATE_MAIN_INPUT,
  SET_ACTIVE_TAB,
  ADD_ROW_ALUMINIUM,
  REMOVE_ROW_FORMULA,
  MOVE_UP_ROW_FORMULA,
  MOVE_DOWN_ROW_FORMULA,
  ADD_ROW_GLASS,
  ADD_ROW_MATERIAL,
  TOGGLE_SIZE_DISPLAY,
  UPDATE_INPUT_SIZE,
  UPDATE_INPUT_ALUMINIUM,
  UPDATE_INPUT_GLASS,
  UPDATE_INPUT_MATERIAL,
  DISPLAY_MODAL_TYPES,
  DISPLAY_MODAL_PROFILES,
  DISPLAY_MODAL_IMAGE,
  MODAL_TYPES_CHAGE_TYPE,
  MODAL_PROFILES_CHANGE_TYPE,
  MODAL_PROFILES_CHAGE_PROFILE,
  MODAL_TYPES_UPDATE_INPUT_CHANGED,
  MODAL_PROFILES_UPDATE_INPUT_CHANGED,
  MODAL_TYPES_RESET_FORM,
  MODAL_PROFILES_RESET_FORM,
  SET_RESTORE_FORMULA,
  UPDATE_REF_MODAL_IMAGE,
  UPDATE_SELECTED_IMAGE
} from '../actions/formula'
import { config } from '../../Constants'
const oRowAluminium = {
  code: '',
  direction: '',
  amount: 1,
  result_amount: {
    status: null,
    text: ''
  },
  cutting: '',
  result_cutting: {
    status: null,
    text: ''
  }
}
const oRowGlass = {
  keyref: '',
  amount: 1,
  formulaWidth: '',
  resultW: {
    status: null,
    text: ''
  },
  formulaHeight: '',
  resultH: {
    status: null,
    text: ''
  }
}
const oRowMaterial = {
  code: '',
  amount: 1,
  result_amount: {
    status: null,
    text: ''
  },
  cutting: '',
  result_cutting: {
    status: null,
    text: ''
  }
}
const initialState = {
  formulaForm: {
    display: true,
    str_main: 'slide',
    str_sub: 'cross_normal',
    size: {
      width: { value: 200, active: true },
      height: { value: 100, active: true },
      top: { value: 50, active: false },
      bottom: { value: 50, active: false },
      left: { value: 50, active: false },
      right: { value: 50, active: false }
    },
    activeTab: 'aluminium',
    aluminium: [],
    glass: [],
    material: []
  },
  modalTypes: {
    display: false,
    aList: [],
    form: {
      pic: '',
      org_key: '',
      key: '',
      name: ''
    }
  },
  modalProfiles: {
    display: false,
    aMainStr: [],
    aSubStr: [],
    form: {
      pic: '',
      strMain: 'slide',
      org_key: '',
      key: '',
      name: '',
      amount_fixed: '',
      amount_body: ''
    }
  },
  modalUploadImage: {
    display: false,
    refStrMain: null,
    refStrSub: null,
    image: {
      file: null,
      dataURL: null
    }
  }
}

export default function formula(state = initialState, action){
    switch (action.type) {
        case UPDATE_MAIN_INPUT: {
          return {
            ...state,
            formulaForm: {
              ...state.formulaForm,
              [action.payload.keyref]: action.payload.value
            }
          }
        }
        case ADD_ROW_ALUMINIUM: {
          console.log(">>> Begin reducer ADD_ROW_ALUMINIUM");
          console.log("# state.formulaForm.aluminium");
          console.log(state.formulaForm.aluminium);
          let aAlm = state.formulaForm.aluminium;
          aAlm.push(oRowAluminium);
          return {
            ...state,
            formulaForm: {
              ...state.formulaForm,
              aluminium: aAlm
            }
          }
        }
        case REMOVE_ROW_FORMULA: {
          console.log(">>> Begin reducer REMOVE_ROW_FORMULA");
          const type = action.payload.type;
          const row = parseInt(action.payload.row);
          
          let aItems = state.formulaForm[type];
          console.log("# aItems (before splice)");
          console.log(aItems);
          aItems.splice(row, 1);
          console.log("# aItems (after splice)");
          console.log(aItems);
          return {
            ...state,
            formulaForm: {
              ...state.formulaForm,
              [type]: aItems
            }
          }
        }
        case MOVE_UP_ROW_FORMULA: {
          console.log(">>> Begin reducer MOVE_UP_ROW_FORMULA");
          const type = action.payload.type;
          const row = parseInt(action.payload.row);

          let aItems = state.formulaForm[type];
          if(row<=0) return state; 

          let oTmpRow = {};
          oTmpRow = aItems[row-1];
          aItems[row-1] = aItems[row];
          aItems[row] = oTmpRow;
          return {
            ...state,
            formulaForm: {
              ...state.formulaForm,
              [type]: aItems
            }
          }
        }
        case MOVE_DOWN_ROW_FORMULA: {
          console.log(">>> Begin reducer MOVE_DOWN_ROW_FORMULA");
          const type = action.payload.type;
          const row = parseInt(action.payload.row);
          
          let aItems = state.formulaForm[type];
          if(row >= aItems.length-1) return state;

          let oTmpRow = {};
          oTmpRow = aItems[row+1];
          aItems[row+1] = aItems[row];
          aItems[row] = oTmpRow;
          return {
            ...state,
            formulaForm: {
              ...state.formulaForm,
              [type]: aItems
            }
          }
        }
        case ADD_ROW_GLASS: {
          let aGls = state.formulaForm.glass;
          aGls.push(oRowGlass);
          return {
            ...state,
            formulaForm: {
              ...state.formulaForm,
              glass: aGls
            }
          }
        }
        case ADD_ROW_MATERIAL: {
          let aMtr = state.formulaForm.material;
          aMtr.push(oRowMaterial);
          return {
            ...state,
            formulaForm: {
              ...state.formulaForm,
              material: aMtr
            }
          }
        }
        case SET_ACTIVE_TAB: {
          return {
            ...state,
            formulaForm: {
              ...state.formulaForm,
              activeTab: action.key
            }
          }
        }
        case TOGGLE_SIZE_DISPLAY: {
          console.log(">>> Begin reducer TOGGLE_SIZE_DISPLAY");
          console.log("# action");
          console.log(action);
          return {
            ...state,
            formulaForm: {
              ...state.formulaForm,
              size: {
                ...state.formulaForm.size,
                [action.payload.key] : {
                  ...state.formulaForm.size[action.payload.key],
                  active: action.payload.value
                }
              }
            }
          }
        }
        case UPDATE_INPUT_SIZE: {
          console.log(">>> Begin reducer UPDATE_INPUT_SIZE");
          console.log("# action");
          console.log(action);
          return {
            ...state,
            formulaForm: {
              ...state.formulaForm,
              size: {
                ...state.formulaForm.size,
                [action.payload.key] : {
                  value: action.payload.value,
                  active: true
                }
              }
            }
          }
        }
        case UPDATE_INPUT_ALUMINIUM: {
          console.log(">>> Begin reducer UPDATE_INPUT_ALUMINIUM");
          console.log("# action");
          console.log(action);

          return {
            ...state,
            formulaForm: {
              ...state.formulaForm,
              aluminium: [
                ...state.formulaForm.aluminium.slice(0, action.payload.index),
                {
                  ...state.formulaForm.aluminium[action.payload.index],
                  [action.payload.key]: action.payload.value
                },
                ...state.formulaForm.aluminium.slice(action.payload.index+1),
              ]
            }
          }
        }
        case UPDATE_INPUT_GLASS: {
          console.log(">>> Begin reducer UPDATE_INPUT_GLASS");
          console.log("# action");
          console.log(action);

          return {
            ...state,
            formulaForm: {
              ...state.formulaForm,
              glass: [
                ...state.formulaForm.glass.slice(0, action.payload.index),
                {
                  ...state.formulaForm.glass[action.payload.index],
                  [action.payload.key]: action.payload.value
                },
                ...state.formulaForm.glass.slice(action.payload.index+1),
              ]
            }
          }
        }
        case UPDATE_INPUT_MATERIAL: {
          console.log(">>> Begin reducer UPDATE_INPUT_MATERIAL");
          console.log("# action");
          console.log(action);

          return {
            ...state,
            formulaForm: {
              ...state.formulaForm,
              material: [
                ...state.formulaForm.material.slice(0, action.payload.index),
                {
                  ...state.formulaForm.material[action.payload.index],
                  [action.payload.key]: action.payload.value
                },
                ...state.formulaForm.material.slice(action.payload.index+1),
              ]
            }
          }
        }
        case DISPLAY_MODAL_TYPES: {
          return {
            ...state,
            modalTypes: {
              ...state.modalTypes,
              display: action.value
            }
          }
        }
        case DISPLAY_MODAL_PROFILES: {
          return {
            ...state,
            modalProfiles: {
              ...state.modalProfiles,
              display: action.value
            }
          }
        }
        case DISPLAY_MODAL_IMAGE: {
          return {
            ...state,
            modalUploadImage: {
              ...state.modalUploadImage,
              display: action.value
            }
          }
        }
        case MODAL_TYPES_CHAGE_TYPE: {
          return {
            ...state,
            modalTypes: {
              ...state.modalTypes,
              form: {
                ...state.modalTypes.form,
                pic: null,
                org_key: action.payload.key,
                key: action.payload.key,
                name: action.payload.name
              }
            }
          }
        }
        case MODAL_PROFILES_CHANGE_TYPE: {
          return {
            ...state,
            modalProfiles: {
              ...state.modalProfiles,
              form: {
                ...state.modalProfiles.form,
                strMain: action.value
              }
            }
          }
        }
        case MODAL_PROFILES_CHAGE_PROFILE: {
          return {
            ...state,
            modalProfiles: {
              ...state.modalProfiles,
              form: {
                ...state.modalProfiles.form,
                pic: null,
                org_key: action.payload.key,
                key: action.payload.key,
                name: action.payload.name,
                amount_fixed: action.payload.nFixed,
                amount_body: action.payload.nBody
              }
            }
          }
        }
        case MODAL_TYPES_UPDATE_INPUT_CHANGED: {
          return {
            ...state,
            modalTypes: {
              ...state.modalTypes,
              form: {
                ...state.modalTypes.form,
                [action.payload.keyRef]: action.payload.changed
              }
            }
          }
        }
        case MODAL_PROFILES_UPDATE_INPUT_CHANGED: {
          return {
            ...state,
            modalProfiles: {
              ...state.modalProfiles,
              form: {
                ...state.modalProfiles.form,
                [action.payload.keyRef]: action.payload.changed
              }
            }
          }
        }
        case MODAL_TYPES_RESET_FORM: {
          return {
            ...state,
            modalTypes: {
              ...state.modalTypes,
              form: initialState.modalTypes.form
            }
          }
        }
        case MODAL_PROFILES_RESET_FORM: {
          let oInit = initialState.modalProfiles.form;
          return {
            ...state,
            modalProfiles: {
              ...state.modalProfiles,
              form: {
                ...state.modalProfiles.form,
                pic: oInit.pic,
                org_key: oInit.org_key,
                key: oInit.key,
                name: oInit.name,
                amount_fixed: oInit.amount_fixed,
                amount_body: oInit.amount_body
              }
            }
          }
        }
        case SET_RESTORE_FORMULA: {
          return {
            ...state,
            formulaForm: {
              ...state.formulaForm,
              [action.payload.type]: action.payload.data
            }
          }
        }
        case UPDATE_SELECTED_IMAGE: {
          return {
            ...state,
            modalUploadImage: {
              ...state.modalUploadImage,
              image: {
                file: action.payload.file,
                dataURL: action.payload.dataURL
              }
            }
          }
        }
        case UPDATE_REF_MODAL_IMAGE: {
          return {
            ...state,
            modalUploadImage: {
              ...state.modalUploadImage,
              refStrMain: action.payload.strMain,
              refStrSub: action.payload.strSub
            }
          }
        }
        default: return state;
    }// end switch
}