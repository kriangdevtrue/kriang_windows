import React from 'react';
import { connect } from 'react-redux';
import { 
  updateSelectedImage,
  displayModalImage,
  toUploadImage
} from '../../redux/actions/formula';
import { 
} from '../../redux/actions/main';
import { withStyles } from '@material-ui/core/styles';
import ImageUploader from 'react-images-upload';
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
  divButtonUpload: {
    width: '100%',
    textAlign: 'right'
  }
});

class ModalUploadImage extends React.Component {

  displaySelectButton(dp) {
    let oBtSelect = document.getElementsByClassName("chooseFileButton")[0];
    oBtSelect.style.display = (dp?"":"none");
  }
  refreshProfileImage() {
    let path = this.props.propURLRef.imgPath+"structure/";
    let imgURL = path+this.props.propStrMain+"_"+this.props.propStrSub+".png?";
    imgURL += new Date().getTime();
    document.getElementById("main_profile_image").src = imgURL;
  }
  render() {
    const { classes } = this.props;

    return (
      <Modal 
        open={this.props.propModal.display} 
        disableBackdropClick={true} 
        onRendered={()=>{ 
          /*this.props.propResetForm();*/
        }}
      >
        <div className={classes.paper}>
          <div className={classes.body}>
            <ImageUploader
                  withIcon={false}
                  withLabel={false}
                  buttonText='Choose image'
                  onChange={(file, dataURL)=>{
                    this.props.propUpdateSelectedImage(file, dataURL);
                    setTimeout(()=>{
                      let dp = false;
                      if(this.props.propModal.image.dataURL===null) dp = true;
                      this.displaySelectButton(dp);
                    }, 100);
                  }}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                  singleImage={true}
                  withPreview={true}
                />
          </div>
          <div className={classes.divButtonUpload}>
            <button
              onClick={async () => {
                await this.props.propToUpload();
                this.props.propDisplayModal(false);
                this.props.propResetImgData();
                setTimeout(()=>{
                  this.refreshProfileImage();
                }, 1000);
              }}
            >Upload</button>
            <button
              onClick={()=>{
                this.props.propDisplayModal(false);
              }}
            >Close</button>
          </div>
        </div>  
      </Modal>
    );
  }
}

const ModalUploadImageWrapped = withStyles(styles)(ModalUploadImage);

const mapStateToProps = (state) => { 
  return {
    propURLRef: state.main.urlRef,
    propModal: state.formula.modalUploadImage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    propUpdateSelectedImage: (file, dataURL) => {
      console.log("# file");
      console.log(file);
      console.log("# dataURL");
      console.log(dataURL);
      let oFile = null;
      let oData = null;
      if(dataURL[0]){
        oFile = file[0];
        oData = dataURL[0];
      }
      dispatch(updateSelectedImage(oFile, oData));
    },
    propResetImgData: () => {
      dispatch(updateSelectedImage(null, null));
    },
    propDisplayModal: (dp) => {
      dispatch(displayModalImage(dp));
    },
    propToUpload: () => {
      dispatch(toUploadImage());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalUploadImageWrapped);