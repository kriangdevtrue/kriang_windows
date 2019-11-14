import React from 'react';
import { connect } from 'react-redux';
import { 
  displayModalProfiles,
  modalProfilesChangeType,
  modalProfilesUpdateInputChanged,
  modalProfilesChangeProfile,
  toSaveProfile,
  modalProfilesResetForm,
  displayModalImage,
  updateRefModalImage
} from '../../redux/actions/formula';
import { 
  fetchSubStructure
} from '../../redux/actions/main';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '600px',
    left: 'calc(50% - 300px)',
    top: '50px',
    backgroundColor: '#ffffff',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '13px'
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  rowHead: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  colTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'left'
  },
  colButtons: {
    textAlign: 'right'
  },
  rowContent: {
    marginTop: '10px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  colList: {
    width: '45%',
    marginRight: '5%'
  },
  inputLabel: {
    width: '100%',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  divMainList: {
    width: '100%',
    marginTop: '5px',
    textAlign: 'left'
  },
  mainList: {
    width: '100%',
    fontSize: '14px'
  },
  subList: {
    width: '100%',
    fontSize: '14px'
  },
  colForm: {
    width: '45%',
    marginRight: '5%'
  },
  rowPic: {
    width: '100%',
    marginTop: '10px',
    textAlign: 'center',
    marginBottom: '5px'
  },
  divModalProfileImage: {
    width: '140px !important',
    height: '140px !important',
    marginLeft: 'calc(50% - 70px)',
    marginRight: 'calc(50% - 70px)',
    backgroundColor: 'grey',
    position: 'relative'
  },
  divModalBtUploadImgProfile: {
    position: 'absolute',
    bottom: '5px',
    width: '100%',
    left: '0px',
    textAlign: 'center'
  },
  modalProfileImage: {
    width: '100%',
    height: '100%'
  },
  rowInputText: {
    marginTop: '10px',
    width: '100%'
  },
  rowFlex: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10px',
    width: '100%'
  },
  colInput50: {
    width: '40%',
    marginRight: '10%'
  },
  divInputText: {
    width: '100%',
    marginTop: '3px'
  },
  inputText: {
    width: '100%',
    fontSize: '14px',
    padding: '10px'
  }
});

class ModalProfiles extends React.Component {

  changeProfile = (event) => {
    let keyGet = event.target.value;
    let oRet = {
      code: '',
      name: '',
      amount_fixed: '',
      amount_body: ''
    }; 
    //console.log(this.props.propInitDataRef);
    if(keyGet!=='create-new'){
      let aList = this.props.propInitDataRef.aSubStructure;
      aList.map((oVal, vIndex) => {
        if((oVal.code === keyGet)&&(oVal.structure_main_code === this.props.propForm.strMain)){
          oRet = oVal;
        }
      });
    }
    this.props.propChangeProfile(oRet);
    return;
  }

  render() {
    const { classes } = this.props;
    const strMain = this.props.propForm.strMain;
    const strSub = this.props.propForm.key;
    return (
      <Modal 
        open={this.props.propModal.display} 
        disableBackdropClick={true} 
        onRendered={()=>{ 
          this.props.propResetForm();
        }}
      >
        <div className={classes.paper}>
          <div className={classes.body}>
            <div className={classes.rowHead}>
              <div className={classes.colTitle}>Create/Edit Profile</div>
              <div className={classes.colButtons}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  style={{marginRight: '5px'}} 
                  onClick={this.props.propToSave}
                >Save</Button>
                <Button variant="contained" onClick={this.props.propToExit}>Exit</Button>
              </div>
            </div>
            <div className={classes.rowContent}>
              <div className={classes.colList}>
                <div className={classes.inputLabel}>Types</div>
                <div className={classes.divMainList}>
                  <select id='modalProfilesMainStrList' 
                    className={classes.mainList} 
                    value={this.props.propForm.strMain} 
                    onChange={this.props.propChangeType}
                  >
{(()=>{
  let aList = this.props.propInitDataRef.aMainStructure;
  let aRet = [];
  try{
    aList.map((oVal, vKey)=>{
      aRet.push(<option key={'type-'+vKey} value={oVal.code} >{oVal.code+" :: "+oVal.name}</option>);
    });
  }catch(err){}
  return aRet;
})()}
                  </select>
                </div>
                <div className={classes.divMainList}>
                  <select 
                      id='modalProfilesSubStrList' size='17' 
                      className={classes.subList} 
                      onChange={this.changeProfile}
                  >
                    <option value='create-new' selected >+ New Type</option>
{(()=>{
  let aList = this.props.propInitDataRef.aSubStructure;
  let aRet = [];
  try{
    aList.map((oVal, vKey)=>{
      if(oVal.structure_main_code===this.props.propForm.strMain){
        aRet.push(<option key={'profile-'+vKey} value={oVal.code} >{oVal.code+" :: "+oVal.name}</option>);
      }
    });
  }catch(err){}
  return aRet;
})()}                    
                  </select>
                </div>
              </div>
              <div className={classes.colForm}>
                <div className={classes.rowPic} >
                  <div className={classes.divModalProfileImage}>
                    <img 
                        id="modal_profile_image"
                        src={this.props.propURLRef.imgPath+"structure/"+strMain+"_"+strSub+".png"}
                        className={classes.modalProfileImage} 
                        onError={()=>{
                            //alert("not found img");
                        }}
                    />
                    <div className={classes.divModalBtUploadImgProfile}>
                      <button 
                          onClick={()=>{
                              this.props.propOpenModalUploadImage(
                                this.props.propStrMain,
                                this.props.propStrSub
                              );
                          }}
                      >Upload</button>
                    </div>
                  </div>
                </div>
                <div className={classes.rowInputText}>
                  <div className={classes.inputLabel}>Key</div>
                  <div className={classes.divInputText}>
                    <input type='text' id='profileKey' className={classes.inputText} value={this.props.propForm.key} onChange={this.props.propUpdateInput} />
                  </div>
                </div>
                <div className={classes.rowInputText}>
                  <div className={classes.inputLabel}>Name</div>
                  <div className={classes.divInputText}>
                    <input type='text' id='profileName' className={classes.inputText} value={this.props.propForm.name} onChange={this.props.propUpdateInput} />
                  </div>
                </div>
                <div className={classes.rowFlex}>
                  <div className={classes.colInput50}>
                    <div className={classes.inputLabel}>Fixed amount</div>
                    <div className={classes.divInputText}>
                      <input type='number' id='profileFixed' className={classes.inputText} value={this.props.propForm.amount_fixed} onChange={this.props.propUpdateInput} />
                    </div>
                  </div>
                  <div className={classes.colInput50}>
                    <div className={classes.inputLabel}>Body amount</div>
                    <div className={classes.divInputText}>
                      <input type='number' id='profileBody' className={classes.inputText} value={this.props.propForm.amount_body} onChange={this.props.propUpdateInput} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </Modal>
    );
  }
}

const ModalProfilesWrapped = withStyles(styles)(ModalProfiles);

const mapStateToProps = (state) => { 
  return {
    propURLRef: state.main.urlRef,
    propInitDataRef: state.main.initDataRef,
    propStrMain: state.formula.modalProfiles.form.strMain,
    propStrSub: state.formula.modalProfiles.form.org_key,
    propModal: state.formula.modalProfiles,
    propForm: state.formula.modalProfiles.form,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    propResetForm: () => {
      //dispatch(modalResetForm());
    },
    propChangeType: (event) => {
      dispatch(modalProfilesChangeType(event.target.value));
    },
    propChangeProfile: (oVal) => {
      dispatch(modalProfilesChangeProfile(oVal.code, oVal.name, oVal.amount_fixed, oVal.amount_body));
    },
    propUpdateInput: (event) => {
      console.log(">>> Begin event propUpdateInput");
      let vID = event.target.id;
      let vVal = event.target.value;
      console.log("# vID");
      console.log(vID);
      console.log("# vVal");
      console.log(vVal);
      dispatch(modalProfilesUpdateInputChanged(vID, vVal));
    },
    propToSave: async () => {
     await dispatch(toSaveProfile());
      setTimeout(()=>{
        dispatch(modalProfilesResetForm());
        dispatch(fetchSubStructure());
        document.getElementById("modalProfilesSubStrList").value = 'create-new';
      }, 1500);
    },
    propOpenModalUploadImage: (strMain, strSub) => {
      dispatch(updateRefModalImage(strMain, strSub));
      dispatch(displayModalImage(true));
    },
    propToExit: () => {
      dispatch(displayModalProfiles(false));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalProfilesWrapped);