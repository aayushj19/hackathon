import axios from "axios";

const API_URL = "http://localhost:5000/api/threads";

export const getThreads = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getThreadById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createThread = async (threadData) => {
    const response = await axios.post(API_URL, threadData, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};

export const replyToThread = async (id, replyData) => {
    const response = await axios.post(`${API_URL}/${id}/reply`, replyData);
    return response.data;
};