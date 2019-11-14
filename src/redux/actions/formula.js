import reduxStore from '../';
const axios = require('axios');

//---- by redux
let oLocalStr = () => {
    let oStore = reduxStore.getState();
    return oStore;
}
let fnPersistor = () => {
    return {};
}

let replaceVar = (vFormula) => {
    let oStore = oLocalStr().formula;
    const propInputSize = oStore.formulaForm.size;
    vFormula = vFormula.replace(/\[X\]/gi, propInputSize.width.value);
    vFormula = vFormula.replace(/\[Y\]/gi, propInputSize.height.value);
    vFormula = vFormula.replace(/\[T\]/gi, propInputSize.top.value);
    vFormula = vFormula.replace(/\[B\]/gi, propInputSize.bottom.value);
    vFormula = vFormula.replace(/\[L\]/gi, propInputSize.left.value);
    vFormula = vFormula.replace(/\[R\]/gi, propInputSize.right.value);
    return vFormula;
}
//============== All constants for reducer ================
export const UPDATE_MAIN_INPUT = 'UPDATE_MAIN_INPUT';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const ADD_ROW_ALUMINIUM = 'ADD_ROW_ALUMINIUM';
export const REMOVE_ROW_FORMULA = 'REMOVE_ROW_FORMULA';
export const MOVE_UP_ROW_FORMULA = 'MOVE_UP_ROW_FORMULA';
export const MOVE_DOWN_ROW_FORMULA = 'MOVE_DOWN_ROW_FORMULA';
export const ADD_ROW_GLASS = 'ADD_ROW_GLASS';
export const ADD_ROW_MATERIAL = 'ADD_ROW_MATERIAL';
export const TOGGLE_SIZE_DISPLAY = 'TOGGLE_SIZE_DISPLAY';
export const UPDATE_INPUT_ALUMINIUM = 'UPDATE_INPUT_ALUMINIUM';
export const UPDATE_INPUT_GLASS = 'UPDATE_INPUT_GLASS';
export const UPDATE_INPUT_MATERIAL ='UPDATE_INPUT_MATERIAL';
export const UPDATE_INPUT_SIZE = 'UPDATE_INPUT_SIZE';
export const DISPLAY_MODAL_TYPES = 'DISPLAY_MODAL_TYPES';
export const DISPLAY_MODAL_PROFILES = 'DISPLAY_MODAL_PROFILES';
export const DISPLAY_MODAL_IMAGE = 'DISPLAY_MODAL_IMAGE';
export const MODAL_TYPES_CHAGE_TYPE = 'MODAL_TYPES_CHAGE_TYPE';
export const MODAL_PROFILES_CHANGE_TYPE = 'MODAL_PROFILES_CHANGE_TYPE';
export const MODAL_TYPES_UPDATE_INPUT_CHANGED = 'MODAL_TYPES_UPDATE_INPUT_CHANGED';
export const MODAL_PROFILES_UPDATE_INPUT_CHANGED = 'MODAL_PROFILES_UPDATE_INPUT_CHANGED';
export const MODAL_TYPES_RESET_FORM = 'MODAL_TYPES_RESET_FORM';
export const MODAL_PROFILES_RESET_FORM = 'MODAL_PROFILES_RESET_FORM';
export const MODAL_PROFILES_CHAGE_PROFILE = 'MODAL_PROFILES_CHAGE_PROFILE';
export const SET_RESTORE_FORMULA = 'SET_RESTORE_FORMULA';
export const UPDATE_REF_MODAL_IMAGE = 'UPDATE_REF_MODAL_IMAGE';
export const  UPDATE_SELECTED_IMAGE = 'UPDATE_SELECTED_IMAGE';
//=========================================================

const letGet = async (url) => {
    console.log(">>> begin letGet function to call API");
    console.log("# url");
    console.log(url);
  
    try {
      const response = await axios.get(url);
      console.log("# response of "+url);
      console.log(response);
      if(response.status===200){
        return response.data;
      }else{
        alert("เกิดปัญหาที่ Server "+url);
        return null;
      }
    } catch (error) {
      console.error("# error");
      console.error(error);
      alert("เกิดปัญหาในการเชื่อมต่อ "+url);
      return null;
    }
  }
  
  const letPost = async (url, body) => {
    console.log(">>> begin letPost function to call API");
    console.log("# url");
    console.log(url);
    console.log("# body");
    console.log(body);
    try {
      const response = await axios.post(
        url, 
        body
      );
      console.log("# response of "+url);
      console.log(response);
      if(response.status===200){
        return response.data;
      }else{
        alert("เกิดปัญหาที่ Server");
        return null;
      }
    } catch (error) {
      console.error("# error "+url);
      console.error(error);
      alert("เกิดปัญหาในการเชื่อมต่อ "+url);
      return null;
    }
  }

export const updateMainInput = (payload) => {
    return {
        type: UPDATE_MAIN_INPUT,
        payload: payload
    }
}

export const setActiveTab = (refKey) => {
    return {
        type: SET_ACTIVE_TAB,
        key: refKey
    }
}

export const addRowAluminium = () => {
    return {
        type: ADD_ROW_ALUMINIUM
    } 
}

export const removeRowFormula = (type, row) => {
    return {
        type: REMOVE_ROW_FORMULA,
        payload: {
            type: type,
            row: row
        }
    }
}

export const moveUpRowFormula = (type, row) => {
    return {
        type: MOVE_UP_ROW_FORMULA,
        payload: {
            type: type,
            row: row
        }
    }
}

export const moveDownRowFormula = (type, row) => {
    return {
        type: MOVE_DOWN_ROW_FORMULA,
        payload: {
            type: type,
            row: row
        }
    }
}

export const addRowGlass = () => {
    return {
        type: ADD_ROW_GLASS
    } 
}

export const addRowMaterial = () => {
    return {
        type: ADD_ROW_MATERIAL
    } 
}

export const toggleSizeDisplay = (field, val) => {
    return {
        type: TOGGLE_SIZE_DISPLAY,
        payload: {
            key: field,
            value: val
        }
    }   
}

export const updateInputSize = (field, val) => {
    return {
        type: UPDATE_INPUT_SIZE,
        payload: {
            key: field,
            value: val
        }
    }
}

export const updateInputAluminium = (kRef, index, val) => {
    return {
        type: UPDATE_INPUT_ALUMINIUM,
        payload: {
            key: kRef,
            index: index,
            value: val
        }
    }
}

export const updateInputGlass = (kRef, index, val) => {
    return {
        type: UPDATE_INPUT_GLASS,
        payload: {
            key: kRef,
            index: index,
            value: val
        }
    }
}

export const updateInputMaterial = (kRef, index, val) => {
    return {
        type: UPDATE_INPUT_MATERIAL,
        payload: {
            key: kRef,
            index: index,
            value: val
        }
    }
}

export const displayModalTypes = (dp) => {
    return {
        type: DISPLAY_MODAL_TYPES,
        value: dp
    }
}

export const displayModalProfiles = (dp) => {
    return {
        type: DISPLAY_MODAL_PROFILES,
        value: dp
    }
}

export const displayModalImage = (dp) => {
    return {
        type: DISPLAY_MODAL_IMAGE,
        value: dp
    }
}

export const modalTypesChangeType = (vK, vN) => {
    return {
        type: MODAL_TYPES_CHAGE_TYPE,
        payload: {
            key: vK,
            name: vN
        }
    }
}

export const modalProfilesChangeType = (selected) => {
    return {
        type: MODAL_PROFILES_CHANGE_TYPE,
        value: selected
    }  
}

export const modalProfilesChangeProfile = (vK, vN, nFixed, nBody) => {
    return {
        type: MODAL_PROFILES_CHAGE_PROFILE,
        payload: {
            key: vK,
            name: vN,
            nFixed: nFixed,
            nBody: nBody
        }
    }
}

export const modalTypesUpdateInputChanged = (vID, vVal) => {
    let oKeyRef = {
        typeKey: 'key',
        typeName: 'name'
    };
    return {
        type: MODAL_TYPES_UPDATE_INPUT_CHANGED,
        payload: {
            keyRef: oKeyRef[vID],
            changed: vVal
        }
    }
}

export const modalProfilesUpdateInputChanged = (vID, vVal) => {
    let oKeyRef = {
        profileKey: 'key',
        profileName: 'name',
        profileFixed: 'amount_fixed',
        profileBody: 'amount_body'
    };
    return {
        type: MODAL_PROFILES_UPDATE_INPUT_CHANGED,
        payload: {
            keyRef: oKeyRef[vID],
            changed: vVal
        }
    }
}

export const modalTypesResetForm = () => {
    return {
        type: MODAL_TYPES_RESET_FORM
    }
}

export const modalProfilesResetForm = () => {
    return {
        type: MODAL_PROFILES_RESET_FORM
    }
}


export const toSaveType = () => {
    let oStore = oLocalStr().formula;
    let oStoreMain = oLocalStr().main;
    console.log(">>>>> Begin action save main structure");
    let url = oStoreMain.urlRef.base+"save_main_structure";
    console.log("# url");
    console.log(url);
    let oBody = {
        org_key: oStore.modalTypes.form.org_key,
        key: oStore.modalTypes.form.key,
        name: oStore.modalTypes.form.name
    };
    console.log("# oBody");
    console.log(oBody);
    
    let formData = new FormData();
    formData.append('stfData', JSON.stringify(oBody));
    return (dispatch) => { 
        axios({
            method: 'post',
            url: url,
            data: formData
        })
        .then(function (response) {
            console.log("# response");
            console.log(response);
            if(response.status===200) return response.data
            else throw Error(response.statusText);
        })
        .then((result) => {
            console.log("# result");
            console.log(result);
            return;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export const toSaveProfile = () => {
    let oStore = oLocalStr().formula;
    let oStoreMain = oLocalStr().main;
    console.log(">>>>> Begin action save profile");
    let url = oStoreMain.urlRef.base+"save_sub_structure";
    console.log("# url");
    console.log(url);
    let oBody = {
        org_key: oStore.modalProfiles.form.org_key,
        key: oStore.modalProfiles.form.key,
        name: oStore.modalProfiles.form.name,
        amount_fixed: oStore.modalProfiles.form.amount_fixed,
        amount_body: oStore.modalProfiles.form.amount_body,
        strMain: oStore.modalProfiles.form.strMain
    };
    console.log("# oBody");
    console.log(oBody);
    
    let formData = new FormData();
    formData.append('stfData', JSON.stringify(oBody));
    return (dispatch) => { 
        axios({
            method: 'post',
            url: url,
            data: formData
        })
        .then(function (response) {
            console.log("# response");
            console.log(response);
            if(response.status===200) return response.data
            else throw Error(response.statusText);
        })
        .then((result) => {
            console.log("# result");
            console.log(result);
            return;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export const saveFormula = () => {
    console.clear();
    console.log(">>> Begin action saveFormula");
    let oStoreMain = oLocalStr().main;
    let oStore = oLocalStr().formula;
    let oBody = oStore.formulaForm;
    console.log("# oBody");
    console.log(oBody);
    let formData = new FormData();
    formData.append('stfData', JSON.stringify(oBody));
    return async (dispatch) => { 
        let url = oStoreMain.urlRef.base+"save_formula";
        const result = await letPost(url, formData);
        console.log("# result");
        console.log(result);
    }
}

export const restoreSavedOptionsDisplay = () => {
    console.log(">>> Begin action restoreSavedOptionsDisplay");
    let oStoreMain = oLocalStr().main;
    let oStore = oLocalStr().formula;
    let oBody = {
        str_main: oStore.formulaForm.str_main,
        str_sub: oStore.formulaForm.str_sub
    }
    console.log("# oBody");
    console.log(oBody);
    let formData = new FormData();
    formData.append('stfData', JSON.stringify(oBody));
    return async (dispatch) => { 
        dispatch(toggleSizeDisplay('top', false));
        dispatch(toggleSizeDisplay('bottom', false));
        dispatch(toggleSizeDisplay('left', false));
        dispatch(toggleSizeDisplay('right', false));
        
        let url = oStoreMain.urlRef.base+"get_saved_options_display";
        const result = await letPost(url, formData);
        console.log("# result");
        console.log(result);
        if(result[0]){
            result.map((oRec, vK) => {
                dispatch(toggleSizeDisplay(oRec.keyname, true));
            });
        }
    }
}
export const restoreSavedFormula = () => {
    console.log(">>> Begin action restoreSavedFormula");
    let oStoreMain = oLocalStr().main;
    let oStore = oLocalStr().formula;
    let oBody = {
        str_main: oStore.formulaForm.str_main,
        str_sub: oStore.formulaForm.str_sub
    }
    console.log("# oBody");
    console.log(oBody);
    let formData = new FormData();
    formData.append('stfData', JSON.stringify(oBody));
    return async (dispatch) => { 
        let url = oStoreMain.urlRef.base+"get_saved_formula";
        const result = await letPost(url, formData);
        console.log("# result");
        console.log(result);
        if(result[0]){
            //--- aluminium
            let aAluminium = [];
            result.map((oRec, vK) => {
                if(oRec.ctype==='aluminium'){
                    aAluminium.push({
                        code: oRec.code,
                        direction: oRec.direction,
                        amount: oRec.amount,
                        result_amount: { status: null, text: '' },
                        cutting: oRec.formula,
                        result_cutting: { status: null, text: '' }
                    });
                }
            });
            dispatch(setRestoreFormula(aAluminium, 'aluminium'));
            setTimeout(()=>{ dispatch(bulkTestFormula('aluminium')) }, 200);
            //--- glass
            let aGlass = [];
            result.map((oRec, vK) => {
                if(oRec.ctype==='glass'){
                    let aSpFormula = oRec.formula.split(",");
                    let formulaW = '';
                    try{ formulaW = aSpFormula[0].replace('w:','') }catch(err){ }
                    let formulaH = '';
                    try{ formulaH = aSpFormula[0].replace('h:','') }catch(err){ }
                    aGlass.push({
                        keyref: oRec.code,
                        amount: oRec.amount,
                        formulaWidth: formulaW,
                        resultW: { status: null, text: '' },
                        formulaHeight: formulaH,
                        resultH: { status: null, text: '' }
                    });
                }
            });
            dispatch(setRestoreFormula(aGlass, 'glass'));
            setTimeout(()=>{ dispatch(bulkTestFormula('glass')) }, 200);
            //--- material
            let aMaterial = [];
            result.map((oRec, vK) => {
                if(oRec.ctype==='material'){
                    aMaterial.push({
                        code: oRec.code,
                        amount: oRec.amount,
                        result_amount: { status: null, text: '' },
                        cutting: oRec.formula,
                        result_cutting: { status: null, text: '' }
                    });
                }
            });
            dispatch(setRestoreFormula(aMaterial, 'material'));
            setTimeout(()=>{ dispatch(bulkTestFormula('material')) }, 200);
        }else{
            dispatch(setRestoreFormula([], 'aluminium'));
            dispatch(setRestoreFormula([], 'glass'));
            dispatch(setRestoreFormula([], 'material'));
        }
    }
}

export const setRestoreFormula = (aComp, vType) => {
    return {
        type: SET_RESTORE_FORMULA,
        payload: {
            type: vType,
            data: aComp
        }
    }
}

export const bulkTestFormula = (vType) => {
    let oStore = oLocalStr().formula;
    let aComp = oStore.formulaForm[vType];
    return (dispatch) => { 
        aComp.map((oVal, vK)=>{
            dispatch(testFormula(vK, vType));
        });
    }
}

export const testFormula = (vK, vType) => {
    let oStore = oLocalStr().formula;

    console.log(">>> Begin action testFormula");
    console.log("# vK");
    console.log(vK);
    console.log("# vType");
    console.log(vType);

    let itmRows = [];
    if(vType==='aluminium') itmRows = oStore.formulaForm.aluminium;
    else if(vType==='glass') itmRows = oStore.formulaForm.glass;
    else if(vType==='material') itmRows = oStore.formulaForm.material;

    return (dispatch) => { 
        if((vType==='aluminium')||(vType==='material')){
            let vStatus = false;
            let vResult = null;
            const aFieldsToTest = ['amount', 'cutting'];
            let rawData = null;
            let vFormula = null;
            aFieldsToTest.map((vKeyRef, vIndex)=>{
                rawData = itmRows[vK][vKeyRef];
                console.log("rawData: "+rawData);
                vFormula = rawData;
                console.log("# vFormula before replace");
                console.log(vFormula);
                try{ vFormula = replaceVar(vFormula); } catch(err) {}
                console.log("# vFormula replaced");
                console.log(vFormula);
                vStatus = false;
                vResult = null;
                try{ vResult = eval(vFormula); }catch(err){ }
                console.log("# vResult");
                console.log(vResult);
                
                if(isNaN(vResult)||typeof vResult === 'undefined'||vResult===null){ 
                    vStatus = false; 
                    if(rawData==='' && vKeyRef==='cutting'){
                        vStatus = true; 
                    }
                }else vStatus = true;

                if(vType==='aluminium'){
                    dispatch(updateInputAluminium("result_"+vKeyRef, vK, { status: vStatus, text: vResult }));
                }else if(vType==='material'){
                    dispatch(updateInputMaterial("result_"+vKeyRef, vK, { status: vStatus, text: vResult }));
                }

            });
        }else if(vType==='glass'){
            let vStatus_w = false;
            let vStatus_h = false;
            let vFormula_w = itmRows[vK].formulaWidth;
            vFormula_w = replaceVar(vFormula_w);
            let vFormula_h = itmRows[vK].formulaHeight;
            vFormula_h = replaceVar(vFormula_h);
            let vResult_w = null;
            try{ vResult_w = eval(vFormula_w); }catch(err){}
            vStatus_w = (vResult_w==null?false:true);
            let vResult_h = null;
            try{ vResult_h = eval(vFormula_h); }catch(err){}
            vStatus_h = (vResult_h==null?false:true);
            console.log("# itmRows");
            console.log(itmRows);
            if((parseInt(itmRows[vK].amount) < 1) || (itmRows[vK].amount==='')){
                vStatus_w = false;
                vStatus_h = false;
            }
            if(itmRows[vK].keyref===''){
                vStatus_w = false;
                vStatus_h = false;
            }
            
            dispatch(updateInputGlass("resultW", vK, { status: vStatus_w, text: vResult_w }));
            dispatch(updateInputGlass("resultH", vK, { status: vStatus_h, text: vResult_h }));

        }
    }
}

export const updateSelectedImage = (file, dataURL) => {
    return {
        type: UPDATE_SELECTED_IMAGE,
        payload: {
            file: file,
            dataURL: dataURL
        }
    }
}

export const updateRefModalImage = (strMain, strSub) => {
    console.log(">>> Begin Action updateRefModalImage");
    console.log("strMain", strMain);
    console.log("strSub", strSub);
    return {
        type: UPDATE_REF_MODAL_IMAGE,
        payload: {
            strMain: strMain,
            strSub: strSub
        }
    }
}  

export const toUploadImage = () => {
    console.clear();
    console.log(">>> Begin action toUploadImage");
    let oMain = oLocalStr().main;
    let oFormula = oLocalStr().formula;
    let keyRef = oFormula.modalUploadImage.refStrMain+"_"+oFormula.modalUploadImage.refStrSub;
    let oBody = {
        data: oFormula.modalUploadImage.image.dataURL,
        keyRef: keyRef
    }
    console.log("# oBody");
    console.log(oBody);
    let formData = new FormData();
    formData.append('stfData', JSON.stringify(oBody));
    return async (dispatch) => { 
        let url = oMain.urlRef.base+"upload_profile_image";
        const result = await letPost(url, formData);
        console.log("# result");
        console.log(result);
    }
}