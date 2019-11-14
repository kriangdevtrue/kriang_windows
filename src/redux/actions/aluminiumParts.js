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

//============== All constants for reducer ================
export const DISPLAY_MODAL_NEW = 'DISPLAY_MODAL_NEW';
export const UPDATE_ALUMINIUM_PARTS = 'UPDATE_ALUMINIUM_PARTS';
export const UPDATE_FORM_INPUT = 'UPDATE_FORM_INPUT';
export const RESET_FORM_INPUTS = 'RESET_FORM_INPUTS';
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

export const displayModalNew = (dp) => {
    return {
        type: DISPLAY_MODAL_NEW,
        display: dp
    }
}

export const getAluminiumParts = () => {
    console.log(">>> Begin action getAluminiumParts");
    let oStoreMain = oLocalStr().main;
    // console.log("# oStoreMain");
    // console.log(oStoreMain);

    return async (dispatch) => { 
        let url = oStoreMain.urlRef.base+"parts/aluminium/get_list";
        console.log("# url");
        console.log(url);
        const result = await letGet(url);
        console.log("# result");
        console.log(result);
        return dispatch(updateAlumimiumParts(result));
    }
}

export const updateAlumimiumParts = (result) => {
    return {
        type: UPDATE_ALUMINIUM_PARTS,
        payload: result
    }
}

export const updateFormInput = (idRef, val) => {
    return {
        type: UPDATE_FORM_INPUT,
        payload: {
            keyRef: idRef,
            value: val
        }
    }
}

export const resetFormInputs = () => {
    return {
        type: RESET_FORM_INPUTS
    }
}

export const toSaveItem = () => {
    const oStoreMain = oLocalStr().main;
    const oStoreAlmParts = oLocalStr().aluminiumParts;
    const oBody = oStoreAlmParts.modalNew.form;
    console.log("# oBody");
    console.log(oBody);
    let formData = new FormData();
    formData.append('stfData', JSON.stringify(oBody));
    return async (dispatch) => { 
        let url = oStoreMain.urlRef.base+"parts/aluminium/save";
        const result = await letPost(url, formData);
        console.log("# result");
        console.log(result);
        await dispatch(getAluminiumParts());
        dispatch(resetFormInputs());
        return dispatch(displayModalNew(false));
    }
}

export const removeItem = (code) => {
    const oStoreMain = oLocalStr().main;
    const oStoreAlmParts = oLocalStr().aluminiumParts;
    const oBody = {code: code};
    console.log("# oBody");
    console.log(oBody);
    let formData = new FormData();
    formData.append('stfData', JSON.stringify(oBody));
    return async (dispatch) => { 
        let url = oStoreMain.urlRef.base+"parts/aluminium/remove";
        const result = await letPost(url, formData);
        console.log("# result");
        console.log(result);
        return await dispatch(getAluminiumParts());
    }
}