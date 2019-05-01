import { combineReducers } from "redux";
import user from "./user";
import token from "./token";
import task from "./task";

export default combineReducers({
  user,
  token,
  task
});
