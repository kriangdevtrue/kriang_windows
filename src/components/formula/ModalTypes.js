import React from 'react';
import { connect } from 'react-redux';
import { 
  displayModalTypes,
  modalTypesChangeType,
  modalTypesUpdateInputChanged,
  modalTypesResetForm,
  toSaveType
} from '../../redux/actions/formula';
import { 
  fetchMainStructure
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
  colForm: {
    width: '45%',
    marginRight: '5%'
  },
  rowPic: {
    width: '100%',
    marginTop: '10px',
    textAlign: 'center'
  },
  rowInputText: {
    marginTop: '10px',
    width: '100%'
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

class ModalTypes extends React.Component {
  
  selectedType = (event) =>{
    let keyGet = event.target.value;
    let oRet = {
      code: '',
      name: ''
    }; 
    if(keyGet!=='create-new'){
      let aList = this.props.propInitDataRef.aMainStructure;
      aList.map((oVal, vIndex) => {
        if(oVal.code === keyGet){
          oRet = oVal;
        }
      });
    }
    this.props.propChangeType(oRet);
    return;
  }

  render() {
    const { classes } = this.props;

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
              <div className={classes.colTitle}>Create/Edit Type</div>
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
                  <select id='modalTypesMainStrList' size='10' className={classes.mainList} onChange={this.selectedType} >
                    <option value='create-new' selected >+ New Type</option>
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
              </div>
              <div className={classes.colForm}>
                <div className={classes.rowPic} >Picture</div>
                <div className={classes.rowInputText}>
                  <div className={classes.inputLabel}>Key</div>
                  <div className={classes.divInputText}>
                    <input type='text' id='typeKey' className={classes.inputText} value={this.props.propForm.key} onChange={this.props.propUpdateInput} />
                  </div>
                </div>
                <div className={classes.rowInputText}>
                  <div className={classes.inputLabel}>Name</div>
                  <div className={classes.divInputText}>
                    <input type='text' id='typeName' className={classes.inputText} value={this.props.propForm.name} onChange={this.props.propUpdateInput} />
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

const ModalTypesWrapped = withStyles(styles)(ModalTypes);

const mapStateToProps = (state) => { 
  return {
    propInitDataRef: state.main.initDataRef,
    propModal: state.formula.modalTypes,
    propForm: state.formula.modalTypes.form,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    propResetForm: () => {
      dispatch(modalTypesResetForm());
    },
    propChangeType: (oVal) => {
      dispatch(modalTypesChangeType(oVal.code, oVal.name));
    },
    propUpdateInput: (event) => {
      console.log(">>> Begin event propUpdateInput");
      let vID = event.target.id;
      let vVal = event.target.value;
      console.log("# vID");
      console.log(vID);
      console.log("# vVal");
      console.log(vVal);
      dispatch(modalTypesUpdateInputChanged(vID, vVal));
    },
    propToSave: async () => {
      await dispatch(toSaveType());
      setTimeout(()=>{
        dispatch(modalTypesResetForm());
        dispatch(fetchMainStructure());
        document.getElementById("modalTypesMainStrList").value = 'create-new';
      }, 1500);
    },
    propToExit: () => {
      dispatch(displayModalTypes(false));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalTypesWrapped);