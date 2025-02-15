import handleCart from "./handleCart";
import authReducer from "./auth";
import { combineReducers } from "redux";
const rootReducers = combineReducers({
  handleCart: handleCart,
  auth: authReducer,
});
export default rootReducers;
