import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: '/api',
})

export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload)
export const loginUser = (payload) => api.post(`/login/`, payload)
export const logoutUser = () => api.get(`/logout/`)
export const updateUser = (payload) => api.put(`/user/`, payload)


export const registerMap = (payload) => api.post(`/registerMap/`, payload)
export const deleteMap = () => api.delete(`/deleteMap/`, payload)
export const updateMap = (payload) => api.push(`/updateMap/`, payload)
export const getMap = () => api.get(`/getMap/`, payload)

export const registerMapInfo = (payload) => api.post(`/registerMapInfo/`, payload)
export const deleteMapInfo = () => api.delete(`/deleteMapInfo/`, payload)
export const updateMapInfo = (payload) => api.push(`/updateMapInfo/`, payload)
export const updateMapgetMapInfo = () => api.get(`/updateMapgetMapInfo/`, payload)
export const getAllMapInfoByUser = () => api.get(`/getAllMapInfoByUser/`, payload)

export const registerTileSet = (payload) => api.post(`/registerTileSet/`, payload)
export const deleteTileSet = () => api.delete(`/deleteTileSet/`, payload)
export const updateTileSet = (payload) => api.push(`/updateTileSet/`, payload)
export const getTileSet = () => api.get(`/getTileSet/`, payload)


const apis= {
    registerUser,
    getLoggedIn,
    loginUser,
    logoutUser,
    updateUser,
    registerMap,
    deleteMap,
    updateMap,
    getMap,
    registerMapInfo,
    deleteMapInfo,
    updateMapInfo,
    updateMapgetMapInfo,
    getAllMapInfoByUser,
    registerTileSet,
    deleteTileSet,
    updateTileSet,
    getTileSet
}

export default apis;