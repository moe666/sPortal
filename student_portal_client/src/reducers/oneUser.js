import { GET_ONE_USER } from "../types";

/*const initialState = {
  oneUser: [],
  loading: false
};*/

export default function(state = {}, action = {}) {
  switch (action.type) {
    case GET_ONE_USER:
      return action.oneUserData;

    default:
      return state;
  }
}
