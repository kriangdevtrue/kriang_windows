import React from "react"
import { connect } from 'react-redux';
import { } from '../../redux/actions/main';
import { 
    removeRowFormula,
    moveUpRowFormula,
    moveDownRowFormula 
} from '../../redux/actions/formula';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const ITEM_HEIGHT = 48;
const options = [
    { key: 'remove', label: 'ลบทิ้ง' },
    { key: 'up', label: 'เลื่อนขึ้น' },
    { key: 'down', label: 'เลื่อนลง' }
];
class ButtonRowMenu extends React.Component
{
    state = { anchorEl: null }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = (event) => {
        this.setState({ anchorEl: null });
    }

    selectedMenu = (toDo) => {
        //alert(toDo+'#'+this.props.type+'#'+this.props.row);
        if(toDo === 'remove'){
            this.props.propRemoveRowFormula(this.props.type, this.props.row);
        }else if(toDo === 'up'){
            this.props.propMoveUpRowFormula(this.props.type, this.props.row);
        }else if(toDo === 'down'){
            this.props.propMoveDownRowFormula(this.props.type, this.props.row);
        }
        this.setState({ anchorEl: null });
        this.props.afterSelected();
    }

    render(){
        const open = Boolean(this.state.anchorEl);
        return(
            <>
                <button 
                    style={{
                        height: '100%',
                        cursor: 'pointer'
                    }}
                    onClick={this.handleClick}
                >#</button>
                <Menu
                    id={'row-menu-'+this.props.type+'-'+this.props.row}
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    {options.map(option => (
                    <MenuItem key={option.key} onClick={()=>{ this.selectedMenu(option.key) }} >
                        {option.label}
                    </MenuItem>
                    ))}
                </Menu>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return{ }
}
const mapDispatchToProps = (dispatch) => {
    return {
        propRemoveRowFormula: (type, row) => {
            dispatch(removeRowFormula(type, row));
        },
        propMoveUpRowFormula: (type, row) => {
            dispatch(moveUpRowFormula(type, row));
        },
        propMoveDownRowFormula: (type, row) => {
            dispatch(moveDownRowFormula(type, row));
        }
    }
} 

export default connect(mapStateToProps,mapDispatchToProps) (ButtonRowMenu);