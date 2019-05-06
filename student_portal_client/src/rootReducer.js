import { combineReducers } from "redux";

import user from "./reducers/user";
import allUsers from "./reducers/userData";
import oneUser from "./reducers/oneUser";

export default combineReducers({
  user,
  allUsers,
  oneUser
});
