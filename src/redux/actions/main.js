import reduxStore from '../';
const axios = require('axios');

//---- by redux
let oLocalStr = () => {
    let oStore = reduxStore.getState().main;
    console.log("# oStore");
    console.log(oStore);
    return oStore;
}
let fnPersistor = () => {
    return {};
}

//============== All constants for reducer ================
export const GO_TO_PAGE = 'GO_TO_PAGE';
export const DISPLAY_MAIN_LOADING = 'DISPLAY_MAIN_LOADING';
export const UPDATE_INIT_DATAREF = 'UPDATE_INIT_DATAREF';
export const CHANGE_PRICE_ACTIVE_TYPE = 'CHANGE_PRICE_ACTIVE_TYPE';
export const CREATE_PRICE_FORM_DATA = 'CREATE_PRICE_FORM_DATA';
export const EDIT_PRICE_CREATE = 'EDIT_PRICE_CREATE';
export const CANCEL_EDIT_PRICE = 'CANCEL_EDIT_PRICE';
export const UPDATE_PRICE_CHANGED = 'UPDATE_PRICE_CHANGED';
export const UPDATE_REF_MAIN_STRUCTURE = 'UPDATE_REF_MAIN_STRUCTURE';
export const UPDATE_REF_SUB_STRUCTURE = 'UPDATE_REF_SUB_STRUCTURE';
//=========================================================


export const getInitDataRef = () => {
    let oStore = oLocalStr();
    console.log(">>>>> Begin action getMasterDataRef");
    let urlFetch = oStore.urlRef.base+"init_data_ref";
    console.log("# urlFetch");
    console.log(urlFetch);
    return (dispatch) => {
        axios.get(urlFetch)
            .then(function (response) {
                console.log(response);
                if(response.status==200) return response.data
                else throw Error(response.statusText);
            })
            .then((result) => {
                console.log("# result");
                console.log(result);
                dispatch(updateInitDataRef(result));
                dispatch(createPriceFormData('aluminium'));
                dispatch(createPriceFormData('glass'));
                dispatch(displayMainLoading(false));
                return;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const updateInitDataRef = (data) => {
    return {
        type: UPDATE_INIT_DATAREF,
        payload: data
    }
}

export const goToPage = (page) => {
    return {
        type: GO_TO_PAGE,
        page: page
    }
}

export const changePriceActiveType = (typeChanged) => {
    return {
        type: CHANGE_PRICE_ACTIVE_TYPE,
        payload: typeChanged
    }
}

export const createPriceFormData = (pType) => {
    console.log(">>> Begin action createPriceFormData");
    let oStore = oLocalStr();
    let aData={};
    if(pType=='aluminium'){
        let aAluminiumPrice = oStore.initDataRef.aAluminiumPrice;
        console.log("# aAluminiumPrice.aRefKey");
        console.log(aAluminiumPrice.aRefKey);
        aData = aAluminiumPrice.aRefKey;
    }else if(pType=='glass'){
        let aGlassPrice = oStore.initDataRef.aGlassPrice;
        console.log("# aGlassPrice.aRefKey");
        console.log(aGlassPrice.aRefKey);
        aData = aGlassPrice.aRefKey;
    }

    return {
        type: CREATE_PRICE_FORM_DATA,
        payload: {
            key: pType,
            data: aData
        }
    }
}

export const editPriceCreate = (keyRef, value) => {
    return {
        type: EDIT_PRICE_CREATE,
        payload: {
            key: keyRef,
            value: value
        }
    }
}

export const cancelEditPrice = () => {
    return {
        type: CANCEL_EDIT_PRICE
    }
}

export const updatePriceChanged = (keyRef, valChanged) => {
    return {
        type: UPDATE_PRICE_CHANGED,
        payload: {
            key: keyRef,
            value: valChanged
        }
    }
}

export const displayMainLoading = (dp) => {
    return {
        type: DISPLAY_MAIN_LOADING,
        display: dp
    }
}

export const saveEditedPrice = () => {
    let oStore = oLocalStr();
    console.log(">>>>> Begin action saveEditedPrice");
    
    let url = oStore.urlRef.base+"save_edited_price";
    let oBody = {
        typeRef: oStore.priceForm.typeActive,
        aDataEdit: oStore.priceForm.edit.data
    };
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
            if(response.status==200) return response.data
            else throw Error(response.statusText);
        })
        .then((result) => {
            console.log("# result");
            console.log(result);
            dispatch(cancelEditPrice());
            return dispatch(getInitDataRef());
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    /*
    let urlFetch = oStore.urlRef.base+"init_data_ref";
    console.log("# urlFetch");
    console.log(urlFetch);
    return (dispatch) => {
        axios.get(urlFetch)
            .then(function (response) {
                console.log(response);
                if(response.status==200) return response.data
                else throw Error(response.statusText);
            })
            .then((result) => {
                console.log("# result");
                console.log(result);
                dispatch(updateInitDataRef(result));
                dispatch(createPriceFormData('aluminium'));
                return;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    */
}

export const fetchMainStructure = () => {
    let oStore = oLocalStr();
    console.log(">>>>> Begin action fetchMainStructure");
    let urlFetch = oStore.urlRef.base+"get_init_ref_main_structure";
    console.log("# urlFetch");
    console.log(urlFetch);

    return (dispatch) => {
        axios.get(urlFetch)
            .then(function (response) {
                console.log(response);
                if(response.status===200) return response.data
                else throw Error(response.statusText);
            })
            .then((result) => {
                console.log("# result");
                console.log(result);
                return dispatch(updateRefMainStructure(result));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const updateRefMainStructure = (aMainStr) => {
    return {
        type: UPDATE_REF_MAIN_STRUCTURE,
        payload: aMainStr
    } 
}

export const fetchSubStructure = () => {
    let oStore = oLocalStr();
    console.log(">>>>> Begin action fetchSubStructure");
    let urlFetch = oStore.urlRef.base+"get_init_ref_sub_structure";
    console.log("# urlFetch");
    console.log(urlFetch);

    return (dispatch) => {
        axios.get(urlFetch)
            .then(function (response) {
                console.log(response);
                if(response.status===200) return response.data
                else throw Error(response.statusText);
            })
            .then((result) => {
                console.log("# result");
                console.log(result);
                return dispatch(updateRefSubStructure(result));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const updateRefSubStructure = (aSubStr) => {
    return {
        type: UPDATE_REF_SUB_STRUCTURE,
        payload: aSubStr
    } 
}