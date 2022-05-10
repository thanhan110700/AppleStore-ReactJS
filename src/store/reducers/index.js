import { combineReducers } from "redux"
import authReducer from "./authReducer"
import cartReducer from "./cartReducer"
import productReducer from './productReducer'
const rootReducer = combineReducers({
    auth: authReducer,
    cart:cartReducer,

})

export default rootReducer