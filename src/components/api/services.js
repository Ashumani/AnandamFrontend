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

export const getEmployer = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employer/getEmployer`,params,{ headers:header });
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

export const saveEERegister = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employee/eeRegister`,params,{ headers: header});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const updateEmployee = async (id, params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employee/updateEmployee/`+id,params,{ headers: header});
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
export const searchEmployee = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employee/searchEmployee`,params,{ headers: header});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}


//monthly
export const getEpfReturnByMonth = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/monthly/getEpfReturnByMonth`,params,{ headers: header});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}


export const fillEpfReturn = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/monthly/fillEpfReturn`,params,{ headers: header});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const updateEpfReturn = async (id, params) => {
    try {
        const response = await axios.post(`${BASE_URL}/monthly/updateEpfReturn/`+id,params,{ headers: header});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}
export const fetchEpfReturn = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/monthly/fetchEpfReturn/`+id,{ headers: header});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}
export const uploadEmployee = async (id, formdata) => {
    try {
        const uplaodHeader = {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
          }
       
        const response = await axios.post(`${BASE_URL}/upload/employee/`+id,formdata,{ headers: uplaodHeader});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const uploadMonthlyReturn = async (id, formdata) => {
    try {
        const uplaodHeader = {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
          }
       
        const response = await axios.post(`${BASE_URL}/upload/monthly/`+id,formdata,{ headers: uplaodHeader});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getSummary = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/monthly/getSummary/`+id,{ headers: header});
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}


export const downlaodFile = async (url) => {
    try {
       
        const urlParts  =  url.split('/')
        const response = await axios.get(`${BASE_URL}/`+url,{responseType: 'blob', headers: header});
        url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element
        const a = document.createElement('a');
        a.href = url;
         
        // Extract filename from response headers or use a default
        const filename =urlParts[urlParts.length - 1];
  
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
  
        // Cleanup
        window.URL.revokeObjectURL(url);
  
    } catch (error) {
        throw error.response.data.error;
    }
}