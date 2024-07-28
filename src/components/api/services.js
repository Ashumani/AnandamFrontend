import axios from 'axios'
import { getAuthToken } from '../pages/Auth/authToken';

const BASE_URL = 'http://localhost:4001';
const authToken = getAuthToken()
const header = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json'
  }

export const loginData = async (username,password) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/authenticate`,{
            username,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}


//Empllyer API
export const erRegister = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employer/register`,params,{ headers:header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const erUpdate = async (id, params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employer/updateEmployer/`+id, params,{ headers:header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getErRegister = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employer/getEmployer`,params,{ headers: header});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const fetchAllEmployer = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/employer/fetchAllEmployer`,{ headers: header});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

//Empllyee API

export const getEERegister = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employee/eeRegister`,params,{ headers: header});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const updateEmployeer = async (id, params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employee/updateEmployeer/`+id,params,{ headers: header});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}


export const getAllEmployee = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employee/getAllEmployee`,params,{ headers: header});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getEmployee = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/employee/getEmployee/`+id,{ headers: header});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getEmployeeByUANandEPFid = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employee/getEmployeeByUANandEPFid`,params,{ headers: header});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}