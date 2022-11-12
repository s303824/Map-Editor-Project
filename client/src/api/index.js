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
export const deleteUser = (payload) => api.delete(`/user/`, {data: {id: payload}})
export const changePassword = (payload) => api.put(`/changePassword/`, payload)


export const registerMap = (payload) => api.post(`/registerMap/`, payload)
export const deleteMap = (payload) => api.delete(`/deleteMap/`, {data: {_id: payload}})
export const updateMap = (payload) => api.put(`/updateMap/`, payload)
export const getMap = (payload) => api.get(`/getMap/`, {params: {_id: payload}})

export const registerMapInfo = (payload) => api.post(`/registerMapInfo/`, payload)
export const deleteMapInfo = () => api.delete(`/deleteMapInfo/`)
export const updateMapInfo = (payload) => api.put(`/updateMapInfo/`, payload)
export const getMapInfo = () => api.get(`/getMapInfo/`)
export const getAllMapInfoByUser = (payload) => api.get(`/getAllMapInfoByUser/`, {params: {username: payload}})
export const getAllPublishedMapInfo = () => api.get(`/getAllPublishedMapInfo/`)
export const addCreator = () => api.get(`/addCreator/`)
export const removeCreator = () => api.get(`/removeCreator/`)
export const getMapInfoByListOfIds = (payload) => api.get(`/getMapInfoByListOfIds/`, {params: {idList: payload}})


export const registerTileSet = (payload) => api.post(`/registerTileSet/`, payload)
export const deleteTileSet = () => api.delete(`/deleteTileSet/`)
export const updateTileSet = (payload) => api.put(`/updateTileSet/`, payload)
export const getTileSet = () => api.get(`/getTileSet/`)


const apis= {
    registerUser,
    getLoggedIn,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    changePassword,
    registerMap,
    deleteMap,
    updateMap,
    getMap,
    registerMapInfo,
    deleteMapInfo,
    updateMapInfo,
    getMapInfo,
    getAllMapInfoByUser,
    getAllPublishedMapInfo,
    addCreator,
    removeCreator,
    registerTileSet,
    deleteTileSet,
    updateTileSet,
    getTileSet,
    getMapInfoByListOfIds,
}

export default apis;