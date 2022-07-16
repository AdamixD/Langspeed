import axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://localhost:8080/study_set";

const getStudySet = async (setId) => {
    return await axios.get(API_URL + "/get", {headers: authHeader(), params: {setId: setId}}).catch(error => console.log(error));
};

const getAllStudySets = async () => {
    return await axios.get(API_URL + "/all", {headers: authHeader() }).then(res => res.data).catch(error => console.log(error));
};

const getStudySetTerms = async (setId) => {
    return await axios.get(API_URL + "/get_terms", {headers: authHeader(), params: {setId: setId}}).then(res => res.data).catch(error => console.log(error));
}

const getStudySetMasteredTerms = async (setId) => {
    return await axios.get(API_URL + "/get_mastered_terms", {headers: authHeader(), params: {setId: setId}}).then(res => res.data).catch(error => console.log(error));
}

const getStudySetSelectedTerms = async (setId) => {
    return await axios.get(API_URL + "/get_selected_terms", {headers: authHeader(), params: {setId: setId}}).then(res => res.data).catch(error => console.log(error));
}

const addStudySet = async (title) => {
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

const editStudySet = async (setId, title) => {
    const ownerId = JSON.parse(localStorage.getItem("accessToken")).id;

    return axios({
        method: 'put',
        url: API_URL + "/edit",
        params: {
            setId: setId,
        },
        data : {
            "title": title,
            "ownerId": ownerId,
        },
        headers: authHeader()
    }).then(res => res.data).catch((error) => console.log(error));
}

const deleteStudySet = async (setId) => {
    return await axios.delete(API_URL + "/delete", {headers: authHeader(), params: {setId: setId}}).then(res => res.data).catch(error => console.log(error));
}

const StudySetService = {
    getStudySet,
    getAllStudySets,
    getStudySetTerms,
    getStudySetMasteredTerms,
    getStudySetSelectedTerms,
    addStudySet,
    editStudySet,
    deleteStudySet
};

export default StudySetService;