import axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://localhost:8080/term";

const getTerm = async (termId) => {
    return await axios.get(API_URL + "/get", {headers: authHeader(), params: {termId: termId}}).catch(error => console.log(error));
};

const getAllTerms = async () => {
    return await axios.get(API_URL + "/all", {headers: authHeader() }).then(res => res.data).catch(error => console.log(error));
};

const addTerm = async (term, definition, studySetId) => {
    return axios({
        method: 'post',
        url: API_URL + "/add",
        data : {
            "term": term,
            "definition": definition,
            "studySetId": studySetId,
        },
        headers: authHeader()
    })
}

const editTerm = async (termId, term, definition, studySetId) => {
    return axios({
        method: 'put',
        url: API_URL + "/edit",
        params: {
            termId: termId,
        },
        data : {
            "term": term,
            "definition": definition,
            "studySetId": studySetId,
        },
        headers: authHeader()
    }).then(res => res.data).catch((error) => console.log(error));
}

const tickIsMastered = async (termId) => {
    return axios({
        method: 'put',
        url: API_URL + "/tick_mastered",
        params: {
            termId: termId,
        },
        headers: authHeader()
    }).then(res => res.data).catch((error) => console.log(error));
}

const tickIsSelected = async (termId) => {
    return axios({
        method: 'put',
        url: API_URL + "/tick_selected",
        params: {
            termId: termId,
        },
        headers: authHeader()
    }).then(res => res.data).catch((error) => console.log(error));
}

const deleteTerm = async (termId) => {
    return await axios.delete(API_URL + "/delete", {headers: authHeader(), params: {termId: termId}}).then(res => res.data).catch(error => console.log(error));
}

const TermService = {
    getTerm,
    getAllTerms,
    addTerm,
    editTerm,
    tickIsMastered,
    tickIsSelected,
    deleteTerm
};

export default TermService;