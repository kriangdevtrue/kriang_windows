import React from "react"
import { 
    goToPage
} from '../redux/actions/main';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '300px',
        marginLeft: 'calc(50% - 150px)',
        marginRight: 'calc(50% - 150px)',
        textAlign: 'center',
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '20px',
        marginTop: '20px'
    },
    rowButton: {
        width: '100%',
        marginBottom: '10px'
    },
    button: {
        width: '100%'
    }
});

class MainMenu extends React.Component
{
    componentDidMount(){ }
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root} >
                <div className={classes.title} >
                    My Windows
                </div>
                <div className={classes.rowButton} >
                    <Button 
                        variant="contained" 
                        color="default" 
                        onClick={()=>{
                            this.props.propGoToPage('formula');
                        }}
                        className={classes.button}
                    >Formula</Button>
                </div>
            </div>
        );
    }
}

const MainMenuStyled = withStyles(styles)(MainMenu);

const mapStateToProps = (state) => {
    return{
        propCurrentPage: state.main.current_page
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        propGoToPage: (page) => {
            dispatch(goToPage(page));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (MainMenuStyled);