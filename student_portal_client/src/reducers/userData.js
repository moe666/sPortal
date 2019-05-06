import { GET_ALL_USERS, FILTER_USERS_BY_LOCATION } from "../types";

const initialState = {
  allUsers: [],
  filteredUsers: [],
  loading: false
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        allUsers: action.allUsers
      };
    case FILTER_USERS_BY_LOCATION:
      return {
        ...state,
        filteredUsers: state.allUsers.filter(
          user => user.location.toLowerCase() === action.userLocation
        )
      };

    default:
      return state;
  }
}
