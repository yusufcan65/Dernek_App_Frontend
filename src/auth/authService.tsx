import axios from 'axios';

const API_URL = "http://localhost:8088/api/auth/";

export const register = (username: string, password: string) => {
    return axios.post(API_URL + "register", { username, password });
};


export const login = async (username: string, password: string) => {
    const response = await axios.post(API_URL + "login", { username, password });
    
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
};