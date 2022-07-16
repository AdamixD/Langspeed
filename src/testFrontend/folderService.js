import axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://localhost:8080/folder";

const getFolder = async (folderId) => {
    return await axios.get(API_URL + "/get", {headers: authHeader(), params: {folderId: folderId}}).catch(error => console.log(error));
};

const getAllFolders = async () => {
    return await axios.get(API_URL + "/all", {headers: authHeader() }).then(res => res.data).catch(error => console.log(error));
};

const getFolderStudySets = async (folderId) => {
    return await axios.get(API_URL + "/get_study_sets", {headers: authHeader(), params: {folderId: folderId}}).then(res => res.data).catch(error => console.log(error));
}

const addFolder = async (title) => {
    const ownerId = JSON.parse(localStorage.getItem("accessToken")).id;

    return axios({
        method: 'post',
        url: API_URL + "/add",
        data : {
            "title": title,
            "ownerId": ownerId,
        },
        headers: authHeader()
    })
}

const editFolder = async (folderId, title) => {
    const ownerId = JSON.parse(localStorage.getItem("accessToken")).id;

    return axios({
        method: 'put',
        url: API_URL + "/edit",
        params: {
            folderId: folderId,
        },
        data : {
            "title": title,
            "ownerId": ownerId,
        },
        headers: authHeader()
    }).then(res => res.data).catch((error) => console.log(error));
}


const deleteFolder = async (folderId) => {
    return await axios.delete(API_URL + "/delete", {headers: authHeader(), params: {folderId: folderId}}).then(res => res.data).catch(error => console.log(error));
}

const FolderService = {
    getFolder,
    getAllFolders,
    getFolderStudySets,
    addFolder,
    editFolder,
    deleteFolder
};

export default FolderService;