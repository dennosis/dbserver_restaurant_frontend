
import axios from 'axios'
import queryString from 'query-string'


if (process.env.NODE_ENV !== 'production') 
    require('dotenv').config()
 const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const getHeader=()=>{
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        //"Authorization": `Bearer ${getToken()}`
    }
}

// User routes
const getUsers = () => api.get('/user',{headers:  getHeader()})
const getUserById = (id) => api.get(`/user/${id}`,{headers:  getHeader()})
const storeUser = (user) => api.post(`/user`, user, {headers:  getHeader()})
const setUser = (user) => api.put(`/user`, user, {headers:  getHeader()})
const deleteUser = (id) => api.delete(`/user/${id}`,{headers:  getHeader()})


// Restaurant routes
const getRestaurants = () => api.get('/restaurant',{headers:  getHeader()})
const getRestaurantById = (id) => api.get(`/restaurant/${id}`,{headers:  getHeader()})
const storeRestaurant = (item) => api.post(`/restaurant`, item, {headers:  getHeader()})
const setRestaurant = (item) => api.put(`/restaurant`, item, {headers:  getHeader()})
const deleteRestaurant = (id) => api.delete(`/restaurant/${id}`,{headers:  getHeader()})


// Restaurant routes
const getVotes = (query) => api.get(`/vote?${queryString.stringify(query)}`,{headers:  getHeader()})
const getVoteById = (id) => api.get(`/vote/${id}`,{headers:  getHeader()})
const storeVote = (item) => api.post(`/vote`, item, {headers:  getHeader()})
const setVote = (item) => api.put(`/vote`, item, {headers:  getHeader()})
const deleteVote = (id) => api.delete(`/vote/${id}`,{headers:  getHeader()})


const apis = {

    getUsers,
    getUserById,
    storeUser,
    setUser,
    deleteUser,


    getRestaurants,
    getRestaurantById,
    storeRestaurant,
    setRestaurant,
    deleteRestaurant,

    getVotes,
    getVoteById,
    storeVote,
    setVote,
    deleteVote

}

export default apis