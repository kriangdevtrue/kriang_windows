import React from 'react';
import { connect } from 'react-redux';
import { } from '../redux/actions/main';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ReactLoading from 'react-loading';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: 140,
    marginLeft: 'calc(50% - 100px)',
    marginTop: '150px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    textAlign: 'center'
  },
  txtPleaseWait: {
    width: '100%',
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '20px'
  },
  divAnmLoading: {
    width: '100%',
    marginLeft: 'calc(50% - 55px)'
  }
});

class ModalMainLoading extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Modal open={this.props.propMainLoading} >
        <div className={classes.paper}>
            <div className={classes.txtPleaseWait} >Please Wait</div>
            <div className={classes.divAnmLoading} >
              <ReactLoading type={'bars'} color={'green'} height={80} width={100} />
            </div>
        </div>
      </Modal>
    );
  }
}

const ModalMainLoadingWrapped = withStyles(styles)(ModalMainLoading);

const mapStateToProps = (state) => { 
  return {
    propMainLoading: state.main.main_loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return { }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalMainLoadingWrapped);