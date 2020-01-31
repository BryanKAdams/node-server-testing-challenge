import axios from 'axios';

export const axiosWithAuth = () => {
    const token = sessionStorage.getItem('token');
    return axios.create({
        baseURL: 'https://lambda-anywhere-fitness.herokuapp.com/api',
        headers: {
            Authorization: token
        }
    })
}