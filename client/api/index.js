import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const registerUser = (payload) => api.post(`register`, payload)

const apis= {
    registerUser,
}

export default apis;