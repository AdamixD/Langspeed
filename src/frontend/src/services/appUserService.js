import axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://localhost:8080/user";

const getUser = async () => {
    const id = JSON.parse(localStorage.getItem("accessToken")).id;

    return await axios.get(API_URL + "/get", {headers: authHeader(), params: {id: id}}).catch(error => console.log(error));
};

const getUserByEmail = async () => {
    const email = JSON.parse(localStorage.getItem("accessToken")).email;

    return await axios.get(API_URL + "/get_by_email", {headers: authHeader(), params: {email: email}}).catch(error => console.log(error));
};

const getAllUsers = async () => {
    return await axios.get(API_URL + "/all", {headers: authHeader() }).then(res => res.data).catch(error => console.log(error));
}

const getFoldersByUserId = async () => {
    const id = JSON.parse(localStorage.getItem("accessToken")).id;

    return await axios.get(API_URL + "/folders", {headers: authHeader(), params: {id: id}}).then(res => res.data).catch(error => console.log(error));
}

const getStudySetsByUserId = async () => {
    const id = JSON.parse(localStorage.getItem("accessToken")).id;

    return await axios.get(API_URL + "/study_sets", {headers: authHeader(), params: {id: id}}).then(res => res.data).catch(error => console.log(error));
}

const editUser = async (firstName, lastName) => {
    const id = JSON.parse(localStorage.getItem("accessToken")).id;

    return axios({
        method: 'put',
        url: API_URL + "/edit",
        params: {
            id: id,
        },
        data : {
            "firstName": firstName,
            "lastName": lastName,
        },
        headers: authHeader()
    }).then(res => res.data).catch((error) => console.log(error));
}

const deleteUser = async () => {
    const id = JSON.parse(localStorage.getItem("accessToken")).id;

    return await axios.delete(API_URL + "/delete", {headers: authHeader(), params: {id: id}}).then(res => res.data).catch(error => console.log(error));
}

const AppUserService = {
    getUser,
    getUserByEmail,
    getAllUsers,
    getFoldersByUserId,
    getStudySetsByUserId,
    editUser,
    deleteUser
};

export default AppUserService;