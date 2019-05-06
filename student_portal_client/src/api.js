import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios
        .post("http://localhost:8080/api/auth", {
          credentials
        })
        .then(res => res.data.user),

    registration: user =>
      axios
        .post("http://localhost:8080/api/users/registration", {
          user
        })
        .then(res => res.data.user), //call users.js routes backend

    confirm: token =>
      axios
        .post("http://localhost:8080/api/auth/confirmation", {
          token
        })
        .then(res => res.data.user),

    resetPasswordRequest: email =>
      axios.post("http://localhost:8080/api/auth/reset_password_request", {
        email
      }),

    validateToken: token =>
      axios.post("http://localhost:8080/api/auth/validate_token", { token }),

    resetPassword: data =>
      axios.post("http://localhost:8080/api/auth/reset_password", { data }),

    getAllUsers: () =>
      axios.get("http://localhost:8080/api/users").then(res => res.data),

    filterLocation: location =>
      axios
        .post("http://localhost:8080/api/users", { location })
        .then(res => res.data),

    getUserData: email =>
      axios
        .post("http://localhost:8080/api/users/dashboard", { email })
        .then(res => res.data),

    approveUser: id =>
      axios.post(`http://localhost:8080/api/users/waiting-users/${id}`),

    deleteUser: id =>
      axios.delete(`http://localhost:8080/api/users/delete-users/${id}`),

    updateImage: user =>
      axios({
        method: "post",
        url: `http://localhost:8080/api/users/update-img/${user.get("id")}`,
        data: user,
        headers: {
          "content-type": `multipart/form-data; boundary=${user._boundary}`
        }
      }).then(res => res.data),
    updateProfile: user =>
      axios
        .put(`http://localhost:8080/api/users/update-user/${user.id}`, {
          user
        })
        .then(res => res.data)
  }
};
