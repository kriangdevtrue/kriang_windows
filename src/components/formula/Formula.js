import React from "react"
import { 
    getInitDataRef,
    displayMainLoading
} from '../../redux/actions/main';
import {
    updateMainInput,
    toggleSizeDisplay,
    setActiveTab,
    addRowAluminium,
    addRowGlass,
    addRowMaterial,
    updateInputSize,
    updateInputAluminium,
    updateInputGlass,
    updateInputMaterial,
    displayModalTypes,
    displayModalProfiles,
    displayModalImage,
    updateRefModalImage,
    saveFormula,
    testFormula,
    restoreSavedOptionsDisplay,
    restoreSavedFormula,
    bulkTestFormula
} from '../../redux/actions/formula';
import ModalTypes from './ModalTypes';
import ModalProfiles from './ModalProfiles';
import ModalUploadImage from './ModalUploadImage';
import ButtonRowMenu from './ButtonRowMenu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
    root: {
        width: '96%',
        marginLeft: '2%',
        marginRight: '2%',
        textAlign: 'left',
        marginTop: '10px'
    },
    header: {
        fontSize: '18px',
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'left'
    },
    boxMainInput: {
        height: '30px',
        width: '100px',
        borderRadius: '3px',
        fontWeight: 'bold',
        fontSize: '16px',
        backgroundColor: '#000000',
        color: '#66ff33',
        textAlign: 'right'
    },
    boxMainInputDisactive: {
        height: '30px',
        width: '100px',
        borderRadius: '3px',
        fontSize: '16px',
        backgroundColor: '#cccccc',
        color: '#aaaaaa',
        textAlign: 'right'
    },
    rowTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: '20px'
    },
    rowSubTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: 'fit-content',
    },
    rowMainInputs:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: '20px',
        marginLeft: '10px',
        width: 'fit-content',
        height: 'fit-content',
        padding: '20px',
        border: 'solid 0px #999999',
        backgroundColor: '#ccff99',
        borderRadius: '5px',
    },
    divProfileImage: {
        width: '140px',
        height: '140px',
        backgroundColor: 'grey',
        position: 'relative'
    },
    profileImage: {
        width: '100%',
        height: '100%'
    },
    divBtUploadImgProfile: {
        position: 'absolute',
        bottom: '5px',
        width: '100%',
        left: '0px',
        textAlign: 'center'
    },
    colMainInputs: {
        marginRight: '10px',
    },
    rowTabs: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '30px'
    },
    divTabs: {
        width: '50%',
        textAlign: 'left'
    },
    divBtNewItem: {
        width: '50%',
        textAlign: 'right'
    },
    rowHeadAlm: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#000000',
        height: '30px',
        paddingTop: '10px',
        width: 'fit-content'
    },
    rowHeadGls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#000000',
        height: '30px',
        paddingTop: '10px',
        width: 'fit-content'
    },
    rowHeadMtr: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#000000',
        height: '30px',
        paddingTop: '10px',
        width: 'fit-content'
    },
    rowItemAlm: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: '5px'
    },
    rowItemGls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: '5px'
    },
    rowItemMtr: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: '5px'
    },
    colAlmBtMenu: {
        width: '25px'
    },
    colAlmItemCode: {
        width: '300px'
    },
    colAlmDirection: {
        width: '70px'
    },
    colAlmAmount: {
        width: '150px'
    },
    colAlmFormula: {
        width: '350px'
    },
    colAlmResult: {
        width: '80px'
    },
    colGlsBtMenu: {
        width: '25px'
    },
    colGlsKeyRef: {
        width: '150px'
    },
    colGlsAmount: {
        width: '100px'
    },
    colGlsFormulaWidth: {
        width: '250px'
    },
    colGlsFormulaHeight: {
        width: '250px'
    },
    colGlsResult: {
        width: '100px'
    },
    spTableHead: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#ffffff'
    },
    colMtrBtMenu: {
        width: '25px'
    },
    colMtrItemCode: {
        width: '200px'
    },
    colMtrAmount: {
        width: '150px'
    },
    colMtrFormula: {
        width: '350px'
    },
    colMtrResult: {
        width: '80px'
    },
    inputBoxFill: {
        width: 'calc(100% - 10px)',
        height: '28px',
        fontSize: '16px',
        verticalAlign: 'bottom'
    },
    selectBoxFill: {
        width: 'calc(100% - 10px)',
        height: '33px',
        fontSize: '16px',
        verticalAlign: 'bottom',
        borderRadius: '0px'
    },
    labelPass: {
        backgroundColor: '#009900',
        color: 'white',
        textAlign: 'center',
        height: '100%',
        lineHeight: '220%',
        fontWeight: 'bold',
        fontSize: '16px'
    },
    labelFail: {
        backgroundColor: '#FF0000',
        color: 'white',
        textAlign: 'center',
        height: '100%',
        lineHeight: '220%',
        fontWeight: 'bold',
        fontSize: '16px'
    },
    rowAluminiums: { 
        marginTop: '10px'
    },
    rowGlasses: {
        marginTop: '10px'
    },
    rowMaterials: {
        marginTop: '10px'
    },
    colPFTypes: {

    },
    colPFName: {
        marginLeft: '40px'
    },
    colBTSave: {
        marginLeft: '100px'
    },
    buttonAdd: {
        marginTop: '20px',
        padding: '8px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: {
        margin: theme.spacing(1),
    },
    fab: {
        margin: theme.spacing(1),
    },
});

const theme = createMuiTheme({
    overrides: {
        MuiInput: {
            formControl: {
                marginTop: '0px'
            }
        },
        MuiButton:{
            containedPrimary: {
                backgroundColor: '#333333',
                color: '#ffffff',
                fontWeight: 'bold'
            },
            containedSecondary: {
                backgroundColor: '#cc0000',
                color: '#ffffff',
                fontWeight: 'bold'
            }
        }
    },
  });

class Formula extends React.Component
{
    componentWillMount(){
        this.props.propGetInitDataRef();
    }
    componentDidMount(){
        this.props.propAutoSelectSubStr();
    }

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root} >
                <MuiThemeProvider theme={theme}>
                    <ModalTypes/>
                    <ModalProfiles/>
                    <ModalUploadImage/>
                    <div className={classes.header} >Aluminium Profiles</div>
                    <div className={classes.rowTop} >
                        <div className={classes.colPFTypes} >
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink >
                                    Type
                                </InputLabel>
                                <NativeSelect          
                                    id={'selStrMain'}
                                    value={this.props.propStrMain}
                                    onChange={(event)=>{
                                        this.props.propUpdateMainStr(event);
                                        this.props.propAutoSelectSubStr();
                                    }}
                                >
{(()=>{
    let aMainStr = this.props.propInitDataRef.aMainStructure;
    let aRet = [];
    try{
        aMainStr.map((oVal, vKey)=>{
            aRet.push(<option key={'ms-'+vKey} value={oVal.code} >{oVal.code+" :: "+oVal.name}</option>);
        });
    }catch(err){ }
    return aRet;
})()}
                                </NativeSelect>
                            </FormControl>
                            <button className={classes.buttonAdd} onClick={this.props.propOpenModalTypes}>+</button>
                        </div>
                        <div className={classes.colPFName} >
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink >
                                    Profile
                                </InputLabel>
                                <NativeSelect
                                    id={'selStrSub'}
                                    value={this.props.propStrSub}
                                    onChange={this.props.propUpdateSubStr}
                                >
{(()=>{
    let aSubStr = this.props.propInitDataRef.aSubStructure;
    let aRet = [];
    try{
        let vFirstVal = null;
        aSubStr.map((oVal, vKey)=>{
            if(oVal.structure_main_code == this.props.propStrMain){
                if(vKey==0) vFirstVal = oVal.code;
                aRet.push(<option key={'ss-'+vKey} value={oVal.code} >{oVal.code+" :: "+oVal.name}</option>);
            }
        });
    }catch(err){ }
    return aRet;
})()}
                                </NativeSelect>
                            </FormControl>
                            <button className={classes.buttonAdd} onClick={this.props.propOpenModalProfiles} >+</button>
                        </div>
                        <div className={classes.colBTSave} >
                            <Button 
                                variant="contained" 
                                color="primary" 
                                className={classes.button} 
                                size="large"
                                onClick={this.props.propToSave}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                    <div className={classes.rowSubTop}>
                        <div className={classes.divProfileImage}>
                            <img 
                                id="main_profile_image"
                                src={this.props.propURLRef.imgPath+"structure/"+this.props.propStrMain+"_"+this.props.propStrSub+".png"}
                                className={classes.profileImage} 
                                onError={()=>{
                                    //alert("not found img");
                                }}
                            />
                        </div>
                        <div className={classes.rowMainInputs} >
                            <div className={classes.colMainInputs}>
                                <div className={classes.divMainInputLabel} >
                                    <input 
                                        type='checkbox' 
                                        name='use_size_width'
                                        className={classes.chkMainInput}
                                        checked={this.props.propSizeInputs.width.active}
                                        onChange={this.props.propToggleSizeDisplay}
                                    />
                                    <span className={classes.spanMainInput} >[X] Width</span>
                                </div>
                                <div className={classes.divMainInputBox} >
                                    <input 
                                        type='number' 
                                        name='size_width'
                                        value={this.props.propSizeInputs.width.value} 
                                        className={(this.props.propSizeInputs.width.active?classes.boxMainInput:classes.boxMainInputDisactive)} 
                                        onChange={this.props.propUpdateInputSize}
                                        disabled={!this.props.propSizeInputs.width.active}
                                    />
                                </div>
                            </div>
                            <div className={classes.colMainInputs}>
                                <div className={classes.divMainInputLabel} >
                                    <input 
                                        type='checkbox' 
                                        name='use_size_height'
                                        className={classes.chkMainInput}
                                        checked={this.props.propSizeInputs.height.active}
                                        onChange={this.props.propToggleSizeDisplay}
                                    />
                                    <span className={classes.spanMainInput} >[Y] Height</span>
                                </div>
                                <div className={classes.divMainInputBox} >
                                    <input 
                                        type='number' 
                                        name='size_height'
                                        value={this.props.propSizeInputs.height.value} 
                                        className={(this.props.propSizeInputs.height.active?classes.boxMainInput:classes.boxMainInputDisactive)} 
                                        onChange={this.props.propUpdateInputSize}
                                        disabled={!this.props.propSizeInputs.height.active}
                                    />
                                </div>
                            </div>
                            <div className={classes.colMainInputs}>
                                <div className={classes.divMainInputLabel} >
                                    <input 
                                        type='checkbox' 
                                        name='use_size_top'
                                        className={classes.chkMainInput}
                                        checked={this.props.propSizeInputs.top.active}
                                        onChange={this.props.propToggleSizeDisplay}
                                    />
                                    <span className={classes.spanMainInput} >[T] Top</span>
                                </div>
                                <div className={classes.divMainInputBox} >
                                    <input 
                                        type='number' 
                                        name='size_top'
                                        value={this.props.propSizeInputs.top.value} 
                                        className={(this.props.propSizeInputs.top.active?classes.boxMainInput:classes.boxMainInputDisactive)} 
                                        onChange={this.props.propUpdateInputSize}
                                        disabled={!this.props.propSizeInputs.top.active}
                                    />
                                </div>
                            </div>
                            <div className={classes.colMainInputs}>
                                <div className={classes.divMainInputLabel} >
                                    <input 
                                        type='checkbox' 
                                        name='use_size_bottom'
                                        className={classes.chkMainInput}
                                        checked={this.props.propSizeInputs.bottom.active}
                                        onChange={this.props.propToggleSizeDisplay}
                                    />
                                    <span className={classes.spanMainInput} >[B] Bottom</span>
                                </div>
                                <div className={classes.divMainInputBox} >
                                    <input 
                                        type='number' 
                                        name='size_bottom'
                                        value={this.props.propSizeInputs.bottom.value} 
                                        className={(this.props.propSizeInputs.bottom.active?classes.boxMainInput:classes.boxMainInputDisactive)} 
                                        onChange={this.props.propUpdateInputSize}
                                        disabled={!this.props.propSizeInputs.bottom.active}
                                    />
                                </div>
                            </div>
                            <div className={classes.colMainInputs}>
                                <div className={classes.divMainInputLabel} >
                                    <input 
                                        type='checkbox' 
                                        name='use_size_left'
                                        className={classes.chkMainInput}
                                        checked={this.props.propSizeInputs.left.active}
                                        onChange={this.props.propToggleSizeDisplay}
                                    />
                                    <span className={classes.spanMainInput} >[L] Left</span>
                                </div>
                                <div className={classes.divMainInputBox} >
                                    <input 
                                        type='number' 
                                        name='size_left'
                                        value={this.props.propSizeInputs.left.value} 
                                        className={(this.props.propSizeInputs.left.active?classes.boxMainInput:classes.boxMainInputDisactive)} 
                                        onChange={this.props.propUpdateInputSize}
                                        disabled={!this.props.propSizeInputs.left.active}
                                    />
                                </div>
                            </div>
                            <div className={classes.colMainInputs}>
                                <div className={classes.divMainInputLabel} >
                                    <input 
                                        type='checkbox' 
                                        name='use_size_right'
                                        className={classes.chkMainInput}
                                        checked={this.props.propSizeInputs.right.active}
                                        onChange={this.props.propToggleSizeDisplay}
                                    />
                                    <span className={classes.spanMainInput} >[R] Right</span>
                                </div>
                                <div className={classes.divMainInputBox} >
                                    <input 
                                        type='number' 
                                        name='size_right'
                                        value={this.props.propSizeInputs.right.value} 
                                        className={(this.props.propSizeInputs.right.active?classes.boxMainInput:classes.boxMainInputDisactive)} 
                                        onChange={this.props.propUpdateInputSize}
                                        disabled={!this.props.propSizeInputs.right.active}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.rowTabs}>
                        <div className={classes.divTabs} >
                        <ButtonGroup
                            variant="contained"
                            size="small"
                        >
                            <Button color={(this.props.propActiveTab==='aluminium'?'primary':'default')} onClick={()=>{ this.props.propSetActiveTab('aluminium'); }} >Aluminium</Button>
                            <Button color={(this.props.propActiveTab==='glass'?'primary':'default')} onClick={()=>{ this.props.propSetActiveTab('glass'); }} >Glass</Button>
                            <Button color={(this.props.propActiveTab==='material'?'primary':'default')} onClick={()=>{ this.props.propSetActiveTab('material'); }} >Material</Button>
                        </ButtonGroup>
                        </div>
                        <div className={classes.divBtNewItem} >
                            {/*<button>New Item</button>*/}
                        </div>
                    </div>
                    <div className={classes.rowAluminiums}  style={{display: (this.props.propActiveTab!=='aluminium'?'none':'')}} >
                        <div className={classes.rowHeadAlm} >
                            <div className={classes.colAlmBtMenu} >

                            </div>
                            <div className={classes.colAlmItemCode} >
                                <span className={classes.spTableHead} >Item code</span>
                            </div>
                            <div className={classes.colAlmDirection} >
                                <span className={classes.spTableHead} >Direction</span>
                            </div>
                            <div className={classes.colAlmAmount} >
                                <span className={classes.spTableHead} >Amount</span>
                            </div>
                            <div className={classes.colAlmResult} >
                                <span className={classes.spTableHead} >R(Amount)</span>
                            </div>
                            <div className={classes.colAlmFormula} >
                                <span className={classes.spTableHead} >Formula Cutting (cm)</span>
                            </div>
                            <div className={classes.colAlmResult} >
                                <span className={classes.spTableHead} >R(Cutting)</span>
                            </div>
                        </div>
{(()=>{
    let aData = this.props.propAluminium;
    let aRet = [];
    aData.map((oVal, vK) => {
        aRet.push(
            <div className={classes.rowItemAlm} >
                <div className={classes.colAlmBtMenu} >
                    <ButtonRowMenu 
                        type={'aluminium'} 
                        row={vK} 
                        afterSelected={()=>{
                            this.forceUpdate();
                        }} 
                    />
                </div>
                <div className={classes.colAlmItemCode} >
                    <select 
                        name='alm-code' 
                        className={classes.selectBoxFill} 
                        value={oVal.code} 
                        onChange={(event)=>{
                            this.props.propUpdateInputAluminium(event, vK);
                            setTimeout(()=>{ this.props.propToTestFormula(vK, 'aluminium'); }, 500);
                    }} >
                        <option value='' >--- เลือก ---</option>
                        {(()=>{
                            let oAliminiumList = this.props.propInitDataRef.aAluminiumList.aRefKey;
                            let aSel_1 = [];
                            for(let k in oAliminiumList){
                                aSel_1.push(<option value={k} >{oAliminiumList[k]+" :: "+k}</option>);
                            }
                            return aSel_1;
                        })()}
                    </select>
                </div>
                <div className={classes.colAlmDirection} >
                    <select 
                        name='alm-direction' 
                        className={classes.selectBoxFill} 
                        value={oVal.direction} 
                        onChange={(event)=>{
                            this.props.propUpdateInputAluminium(event, vK);
                            setTimeout(()=>{ this.props.propToTestFormula(vK, 'aluminium'); }, 500);
                        }} 
                    >
                        <option value='' >-</option>
                        <option value='h' >X</option>
                        <option value='v' >Y</option>
                    </select>
                </div>
                <div className={classes.colAlmAmount} >
                    <input 
                        type='text' 
                        name='alm-amount' 
                        value={oVal.amount} 
                        className={classes.inputBoxFill} 
                        onChange={(event)=>{
                            this.props.propUpdateInputAluminium(event, vK);
                            setTimeout(()=>{ this.props.propToTestFormula(vK, 'aluminium'); }, 500);
                        }} 
                    />
                </div>
                <div className={classes.colAlmResult} >
                {(()=>{
                    if(oVal.result_amount.status){
                        return (<div className={classes.labelPass} >{oVal.result_amount.text}</div>);
                    }else{
                        return (<div className={classes.labelFail} >Fail</div>);
                    }
                })()}
                </div>
                <div className={classes.colAlmFormula} >
                    <input 
                        type='text' 
                        name='alm-cutting' 
                        value={oVal.cutting} 
                        className={classes.inputBoxFill} 
                        onChange={(event)=>{
                            this.props.propUpdateInputAluminium(event, vK);
                            setTimeout(()=>{ this.props.propToTestFormula(vK, 'aluminium'); }, 500);
                        }} 
                    />
                </div>
                <div className={classes.colAlmResult} >
                {(()=>{
                    if(oVal.result_cutting.status){
                        return (<div className={classes.labelPass} >{oVal.result_cutting.text}</div>);
                    }else{
                        return (<div className={classes.labelFail} >Fail</div>);
                    }
                })()}
                </div>
            </div>
        );
    });
    return aRet;
})()}

                    </div>
                    <div className={classes.rowGlasses} style={{display: (this.props.propActiveTab!=='glass'?'none':'')}} >
                        <div className={classes.rowHeadGls} >
                            <div className={classes.colGlsBtMenu} >
                            </div>
                            <div className={classes.colGlsKeyRef} >
                                <span className={classes.spTableHead} >Key Ref</span>
                            </div>
                            <div className={classes.colGlsAmount} >
                                <span className={classes.spTableHead} >Amount</span>
                            </div>
                            <div className={classes.colGlsFormulaWidth} >
                                <span className={classes.spTableHead} >Formula Width (cm)</span>
                            </div>
                            <div className={classes.colGlsResult} >
                                <span className={classes.spTableHead} >Result W</span>
                            </div>
                            <div className={classes.colGlsFormulaHeight} >
                                <span className={classes.spTableHead} >Formula Height (cm)</span>
                            </div>
                            <div className={classes.colGlsResult} >
                                <span className={classes.spTableHead} >Result H</span>
                            </div>
                        </div>
{(()=>{
    let aData = this.props.propGlass;
    let aRet = [];
    aData.map((oVal, vK) => {
        aRet.push(
            <div className={classes.rowItemGls} >
                <div className={classes.colGlsBtMenu} >
                    <ButtonRowMenu 
                        type={'glass'} 
                        row={vK} 
                        afterSelected={()=>{
                            this.forceUpdate();
                        }} 
                    />
                </div>
                <div className={classes.colGlsKeyRef} >
                    <input 
                        type='text' 
                        name='gls-keyref' 
                        value={oVal.keyref} 
                        className={classes.inputBoxFill} 
                        onChange={(event)=>{
                            this.props.propUpdateInputGlass(event, vK);
                            setTimeout(()=>{ this.props.propToTestFormula(vK, 'glass'); }, 500);
                        }} 
                    />
                </div>
                <div className={classes.colGlsAmount} >
                    <input 
                        type='number' 
                        name='gls-amount' 
                        value={oVal.amount} 
                        className={classes.inputBoxFill} 
                        onChange={(event)=>{
                            this.props.propUpdateInputGlass(event, vK);
                            setTimeout(()=>{ this.props.propToTestFormula(vK, 'glass'); }, 500);
                        }} 
                    />
                </div>
                <div className={classes.colGlsFormulaWidth} >
                    <input 
                        type='text' 
                        name='gls-formulaWidth' 
                        value={oVal.formulaWidth} 
                        className={classes.inputBoxFill} 
                        onChange={(event)=>{
                            this.props.propUpdateInputGlass(event, vK);
                            setTimeout(()=>{ this.props.propToTestFormula(vK, 'glass'); }, 500);
                        }} 
                    />
                </div>
                <div className={classes.colGlsResult} >
                {(()=>{
                    if(oVal.resultW.status){
                        return (<div className={classes.labelPass} >{oVal.resultW.text}</div>);
                    }else{
                        return (<div className={classes.labelFail} >Fail</div>);
                    }
                })()}
                </div>
                <div className={classes.colGlsFormulaHeight} >
                    <input 
                        type='text' 
                        name='gls-formulaHeight' 
                        value={oVal.formulaHeight} 
                        className={classes.inputBoxFill} 
                        onChange={(event)=>{
                            this.props.propUpdateInputGlass(event, vK);
                            setTimeout(()=>{ this.props.propToTestFormula(vK, 'glass'); }, 500);
                        }} 
                    />
                </div>
                <div className={classes.colGlsResult} >
                {(()=>{
                    if(oVal.resultH.status){
                        return (<div className={classes.labelPass} >{oVal.resultH.text}</div>);
                    }else{
                        return (<div className={classes.labelFail} >Fail</div>);
                    }
                })()}
                </div>
            </div>
        );
    });
    return aRet;
})()}
                    </div>
                    <div className={classes.rowMaterials} style={{display: (this.props.propActiveTab!=='material'?'none':'')}} >
                        <div className={classes.rowHeadMtr} >
                            <div className={classes.colMtrBtMenu} >
                            </div>
                            <div className={classes.colMtrItemCode} >
                                <span className={classes.spTableHead} >Item code</span>
                            </div>
                            <div className={classes.colMtrAmount} >
                                <span className={classes.spTableHead} >Amount</span>
                            </div>
                            <div className={classes.colMtrResult} >
                                <span className={classes.spTableHead} >R(Amount)</span>
                            </div>
                            <div className={classes.colMtrFormula} >
                                <span className={classes.spTableHead} >Formula Cutting (cm)</span>
                            </div>
                            <div className={classes.colMtrResult} >
                                <span className={classes.spTableHead} >R(Cutting)</span>
                            </div>
                        </div>
{(()=>{
    let aData = this.props.propMaterial;
    let aRet = [];
    aData.map((oVal, vK) => {
        aRet.push(
            <div className={classes.rowItemMtr} >
                <div className={classes.colMtrBtMenu} >
                    <ButtonRowMenu 
                        type={'material'} 
                        row={vK} 
                        afterSelected={()=>{
                            this.forceUpdate();
                        }} 
                    />
                </div>
                <div className={classes.colMtrItemCode} >
                    <select 
                        name='mtr-code' 
                        className={classes.selectBoxFill} 
                        value={oVal.code} 
                        onChange={(event)=>{
                            this.props.propUpdateInputMaterial(event, vK);
                            setTimeout(()=>{ this.props.propToTestFormula(vK, 'material'); }, 500);
                        }} >
                        <option value='' >--- เลือก ---</option>
                        {(()=>{
                            let oMaterialList = this.props.propInitDataRef.aMaterialList.aRefKey;
                            let aSel_1 = [];
                            for(let k in oMaterialList){
                                aSel_1.push(<option value={k} >{oMaterialList[k].name+" :: "+k}</option>);
                            }
                            return aSel_1;
                        })()}
                    </select>
                </div>
                <div className={classes.colMtrAmount} >
                    <input 
                        type='text' 
                        name='mtr-amount' 
                        value={oVal.amount} 
                        className={classes.inputBoxFill} 
                        onChange={(event)=>{
                            this.props.propUpdateInputMaterial(event, vK);
                            setTimeout(()=>{ this.props.propToTestFormula(vK, 'material'); }, 500);
                        }} 
                    />
                </div>
                <div className={classes.colMtrResult} >
                {(()=>{
                    if(oVal.result_amount.status){
                        return (<div className={classes.labelPass} >{oVal.result_amount.text}</div>);
                    }else{
                        return (<div className={classes.labelFail} >Fail</div>);
                    }
                })()}
                </div>
                <div className={classes.colMtrFormula} >
                    <input 
                        type='text' 
                        name='mtr-cutting' 
                        value={oVal.cutting} 
                        className={classes.inputBoxFill} 
                        onChange={(event)=>{
                            this.props.propUpdateInputMaterial(event, vK);
                            setTimeout(()=>{ this.props.propToTestFormula(vK, 'material'); }, 500);
                        }} 
                    />
                </div>
                <div className={classes.colMtrResult} >
                {(()=>{
                    if(oVal.result_cutting.status){
                        return (<div className={classes.labelPass} >{oVal.result_cutting.text}</div>);
                    }else{
                        return (<div className={classes.labelFail} >Fail</div>);
                    }
                })()}
                </div>
            </div>
        );
    });
    return aRet;
})()}
                    </div>
                    <div className={classes.rowBottom} >
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            className={classes.button} 
                            size="small" 
                            onClick={()=>{
                                if(this.props.propActiveTab==='aluminium') this.props.propAddRowAluminium();
                                else if(this.props.propActiveTab==='glass') this.props.propAddRowGlass();
                                else if(this.props.propActiveTab==='material') this.props.propAddRowMaterial();
                                this.forceUpdate();
                            }}
                        >
                            Add
                        </Button>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

Formula.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
const FormulaStyled = withStyles(styles)(Formula);

const mapStateToProps = (state) => {
    //console.log(state);
    return{
        propURLRef: state.main.urlRef,
        propInitDataRef: state.main.initDataRef,
        propActiveTab: state.formula.formulaForm.activeTab,
        propStrMain: state.formula.formulaForm.str_main,
        propStrSub: state.formula.formulaForm.str_sub,
        propSizeInputs: state.formula.formulaForm.size,
        propAluminium: state.formula.formulaForm.aluminium,
        propGlass: state.formula.formulaForm.glass,
        propMaterial: state.formula.formulaForm.material
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        propGetInitDataRef: () => {
            dispatch(displayMainLoading(true));
            dispatch(getInitDataRef());
            setTimeout(async () => { 
                await dispatch(restoreSavedOptionsDisplay());
                await dispatch(restoreSavedFormula());
            }, 2000);
        },
        propUpdateMainStr: (event) => {
            let val = event.target.value;
            const payload = {
                keyref: 'str_main',
                value: val
            }
            dispatch(updateMainInput(payload));
        },
        propUpdateSubStr: (event) => {
            dispatch(displayMainLoading(true));
            let val = event.target.value;
            const payload = {
                keyref: 'str_sub',
                value: val
            }
            dispatch(updateMainInput(payload));
            setTimeout(async ()=>{
                await dispatch(restoreSavedOptionsDisplay());
                await dispatch(restoreSavedFormula());
                await dispatch(displayMainLoading(false));
            }, 500);
        },
        propSetActiveTab: (type) => {
            dispatch(setActiveTab(type));
        },
        propAutoSelectSubStr: () => {
            setTimeout(()=>{
                try{
                    let subStr = document.getElementById("selStrSub").options[0].value;
                    console.log("# subStr");
                    console.log(subStr);

                    const payload = {
                        keyref: 'str_sub',
                        value: subStr
                    }
                    dispatch(updateMainInput(payload));
                    dispatch(restoreSavedFormula());
                }catch(err){  }
            },1500);
        },
        propToggleSizeDisplay: (event) => {
            let name = event.target.name;
            let val = event.target.checked;
            let fieldRef = name.replace("use_size_","");
            console.log(fieldRef+"::"+val);
            dispatch(toggleSizeDisplay(fieldRef, val));
        },
        propUpdateInputSize: (event) => {
            console.log(">>> Begin event propUpdateInputSize"); 
            let name = event.target.name;
            let val = event.target.value;
            console.log("# name");
            console.log(name);
            let fieldRef = name.replace("size_","");
            console.log(fieldRef+"::"+val);
            dispatch(updateInputSize(fieldRef, val));
            // --- refresh test formula all types
            dispatch(bulkTestFormula('aluminium'));
            dispatch(bulkTestFormula('glass'));
            dispatch(bulkTestFormula('material'));
        },
        propAddRowAluminium: () => {
            dispatch(addRowAluminium());
        },
        propAddRowGlass: () => {
            dispatch(addRowGlass());
        },
        propAddRowMaterial: () => {
            dispatch(addRowMaterial());
        },
        /*propShowModalRowMenu: (row, type) => {
            alert(row+"::"+type);
        },*/
        propUpdateInputAluminium: (event, row) => {
            console.log(">>> Begin event propUpdateInputAluminium");
            let name = event.target.name;
            let fieldRef = name.replace('alm-','');
            let val = event.target.value;
            console.log(fieldRef+"::"+row+"::"+val);
            dispatch(updateInputAluminium(fieldRef,row,val));
        },
        propUpdateInputGlass: (event, row) => {
            console.log(">>> Begin event propUpdateInputGlass");
            let name = event.target.name;
            let fieldRef = name.replace('gls-','');
            let val = event.target.value;
            console.log(fieldRef+"::"+row+"::"+val);
            dispatch(updateInputGlass(fieldRef,row,val));
        },
        propUpdateInputMaterial: (event, row) => {
            console.log(">>> Begin event propUpdateInputMaterial");
            let name = event.target.name;
            let fieldRef = name.replace('mtr-','');
            let val = event.target.value;
            console.log(fieldRef+"::"+row+"::"+val);
            dispatch(updateInputMaterial(fieldRef,row,val));
        },
        propToTestFormula: (vK, vType) => {
            dispatch(testFormula(vK, vType));
        },
        propOpenModalTypes: () => {
            dispatch(displayModalTypes(true));
        },
        propOpenModalProfiles: () => {
            dispatch(displayModalProfiles(true));
        },
        propOpenModalUploadImage: (strMain, strSub) => {
            dispatch(updateRefModalImage(strMain, strSub));
            dispatch(displayModalImage(true));
        },
        propToSave: async () => {
            dispatch(displayMainLoading(true));
            await dispatch(saveFormula());
            setTimeout(()=>{
                dispatch(displayMainLoading(false));
            }, 1000);
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (FormulaStyled);