import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TopBar from './TopBar';
import MainMenu from './MainMenu';
import Formula from './formula/Formula';
import ModalMainLoading from './ModalMainLoading';

const styles = theme => ({
    root: { 
        width: '100%',
        textAlign: 'left',
        margin: '5px'
    },
});

class WrappedRoot extends React.Component
{
    componentDidMount(){ }
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root} >
                {(this.props.propCurrentPage!=='main_menu')&&<TopBar/>}
                {(this.props.propCurrentPage==='main_menu')&&<MainMenu/>}
                {(this.props.propCurrentPage==='formula')&&<Formula/>}
                <ModalMainLoading/>
            </div>
        );
    }
}

WrappedRoot.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
const WrappedRootStyled = withStyles(styles)(WrappedRoot);

const mapStateToProps = (state) => {
    //console.log(state);
    return{
        propCurrentPage: state.main.current_page
    }
}

const mapDispatchToProps = (dispatch) => {
    return { }
}

export default connect(mapStateToProps,mapDispatchToProps) (WrappedRootStyled);