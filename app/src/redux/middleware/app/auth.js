import axios from 'axios';
import {API} from "../../../constans";



export const login = (username,password) => {
    return new Promise((resolve, reject) => {
        axios.post(API.LOGIN, {
            username: username,
            password: password
        }).then((response) => {
            console.log(response);
            resolve(response.data);
        }).catch((error) => {
            console.log(error);
            reject(error.response.data.message);
        });
    });
};

export const logout = () =>{
    return new Promise((resolve, reject) => {
        axios.get(API.LOGOUT).then((response) => {
            console.log(response);
            resolve(response.data);
        }).catch((error) => {
            console.log(error);
            reject(error.response.data.message);
        });
    });
}