import React from "react"
import { 
    goToPage
} from '../redux/actions/main';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '100%'
    }
});

class TopBar extends React.Component
{
    componentDidMount(){ }
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root} >
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={()=>{
                        this.props.propGoToPage('main_menu');
                    }}
                    className={classes.button}
                >Back to Main Menu</Button>
            </div>
        );
    }
}

const TopBarStyled = withStyles(styles)(TopBar);

const mapStateToProps = (state) => {
    return{
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        propGoToPage: (page) => {
            dispatch(goToPage(page));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (TopBarStyled);