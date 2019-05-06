import api from "../api";
import { userLoggedIn } from "./auth";
import {
  GET_ALL_USERS,
  GET_ONE_USER,
  FILTER_USERS_BY_LOCATION
} from "../types";

export const allUsersList = allUsers => ({
  type: GET_ALL_USERS,
  allUsers
});

export const oneUser = oneUserData => ({
  type: GET_ONE_USER,
  oneUserData
});

export const filterLocation = userLocation => dispatch => {
  return dispatch({
    type: FILTER_USERS_BY_LOCATION,
    userLocation
  });
};

export const registration = data => dispatch =>
  api.user.registration(data).then(user => {
    localStorage.userJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const approveUser = id => dispatch =>
  api.user.approveUser(id).then(response => {
    if (response.data && response.data.success) {
      api.user.getAllUsers().then(allUsers => {
        dispatch(allUsersList(allUsers));
      });
    } else {
      api.user.getAllUsers().then(allUsers => {
        dispatch(allUsersList(allUsers));
      });
    }
  });

export const deleteUser = id => dispatch =>
  api.user
    .deleteUser(id)
    .then(response => {
      if (response.data && response.data.success) {
        api.user.getAllUsers().then(allUsers => {
          dispatch(allUsersList(allUsers));
        });
      } else {
        api.user.getAllUsers().then(allUsers => {
          dispatch(allUsersList(allUsers));
        });
      }
    })
    .catch(err => {
      console.log(err);
    });

export const getAllUsers = () => dispatch =>
  api.user.getAllUsers().then(allUsers => {
    dispatch(allUsersList(allUsers));
  });

export const getUserData = email => dispatch =>
  api.user
    .getUserData(email)
    .then(user => {
      dispatch(oneUser(user));
    })
    .catch(err => {
      console.log("Error getUserData", err);
    });

export const updateProfile = userData => dispatch =>
  api.user
    .updateProfile(userData)
    .then(updatedUser => {
      dispatch(oneUser(updatedUser));
    })
    .catch(err => {
      console.log("Error updateProfile", err);
    });

export const updateImage = formData => dispatch =>
  api.user
    .updateImage(formData)
    .then(updateImage => {
      dispatch(oneUser(updateImage));
    })
    .catch(err => {
      console.log("Error updateImage", updateImage, err);
    });
