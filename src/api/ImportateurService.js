import axios from "axios";

const API_URL = 'http://localhost:8080/importateurs';
const API_URL_AUTH = 'http://localhost:8080';

export async function login(credentials) {
    return await axios.post(`${API_URL_AUTH}/login`, credentials);
}

export async function register(userInfo) {
    return await axios.post(`${API_URL_AUTH}/register`, userInfo);
}

export async function saveImportateur(importateur) {
    return await axios.post(API_URL, importateur);
}

export async function getImportateurs(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getImportateur(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function udpateImportateur(importateur) {
    return await axios.post(API_URL, importateur);
}

export async function udpatePhoto(formData) {
    return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteImportateur(id) {
    return await axios.delete(`${API_URL}/${id}`);
}