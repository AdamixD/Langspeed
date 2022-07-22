import axios from 'axios';

const API_URL = "http://localhost:8080/auth";

const login = (email, password) => {
    console.log(123);
    console.log(123);
    return axios
        .post(API_URL + "/login", {
                email,
                password,
            }
        )
        .then((res) => {
            if(res.data.token) {
                localStorage.setItem("accessToken", JSON.stringify(res.data));
            }
            return res.data;
        });
};

const register = (firstName, lastName, email, password) => {
    return axios({
        method: 'post',
        url: API_URL + "/registration",
        data : {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
        },
    }).catch(e => console.log(e));
};

const resetPassword = async (password, email) => {
    return axios({
        method: 'post',
        url: API_URL + "/reset_password",
        params: {
            password: password,
            email: email
        },
    }).catch(e => console.log(e));
};

const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("accessToken"));
};

const getUserToken = () => {
    return localStorage.getItem("accessToken");
}

const AuthService = {
    register,
    login,
    resetPassword,
    logout,
    getCurrentUser,
    getUserToken,
};


export default AuthService;