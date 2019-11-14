import { combineReducers } from 'redux'
import main from './main'
import formula from './formula'
import aluminiumParts from './aluminiumParts'

export default combineReducers({
    main,
    formula,
    aluminiumParts
})