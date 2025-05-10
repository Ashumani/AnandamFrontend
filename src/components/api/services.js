import axios from 'axios'
import { getAuthToken } from '../pages/Auth/authToken';
import { handleDecryption, handleEncryption } from './masking';
import { Navigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:4001';
// const BASE_URL = "https://anandam-bckend.vercel.app"
const authToken = getAuthToken()
// axios.defaults.withCredentials = true;
const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
}


export const loginData = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/authenticate`, {
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
        const response = await axios.post(`${BASE_URL}/employer/register`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getEmployer = async (params) => {
    try {


        const response = await axios.post(`${BASE_URL}/employer/getEmployer`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const erUpdate = async (id, params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employer/updateEmployer/` + id, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getErRegister = async (params) => {
    
    try {
        const response = await axios.post(`${BASE_URL}/employer/getEmployer`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const fetchAllEmployer = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/employer/fetchAllEmployer`, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getMasterList = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employer/getMasterList`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const downloadMaster = async (params) => {
    try {
        const response = await axios.get(`${BASE_URL}/upload/downloadMaster`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

//Empllyee API

export const saveEERegister = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employee/eeRegister`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const updateEmployee = async (id, params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employee/updateEmployee/` + id, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getAllEmployee = async (params) => {
    try {
        // await handleEncryption(params)
        const response = await axios.post(`${BASE_URL}/employee/getAllEmployee`, params, { headers: header });
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw error.response.data.error;
    }
}

export const getEmployee = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/employee/getEmployee/` + id, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getEmployeeByUANandEPFid = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employee/getEmployeeByUANandEPFid`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}
export const searchEmployee = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employee/searchEmployee`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}


//monthly
export const getEpfReturnByMonth = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/monthly/getEpfReturnByMonth`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getSalaryReturn = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/salary/getSalaryReturn/` + id, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const sameAsPrev = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/monthly/sameAsPrev`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const deleteReturnById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/monthly/deleteReturnById/` + id, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const generateECR = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/monthly/generateECR`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}



export const fillEpfReturn = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/monthly/fillEpfReturn`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const updateEpfReturn = async (id, params) => {
    try {
        const response = await axios.post(`${BASE_URL}/monthly/updateEpfReturn/` + id, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const get3A = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/monthly/get3A`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getYear = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/monthly/getYear/` + id, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}
export const fetchEpfReturn = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/monthly/fetchEpfReturn/` + id, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}
export const searchMonthlyEmployee = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/monthly/search/`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getEsicReturnByMonth = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/esic/getEsicReturnByMonth`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getEsicReturns = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/esic/getEsicReturns`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const fillEsicReturn = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/esic/fillEsicReturn`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const UpdateEsicReturn = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/esic/UpdateEsicReturn`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getEmployeeByEsic = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/employee/getEmployeeByEsic`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const deletEsicReturnById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/esic/deleteReturnById/` + id, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}
export const uploadEmployer = async (formdata) => {
    try {
        const uplaodHeader = {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
        }

        const response = await axios.post(`${BASE_URL}/upload/employer`, formdata, { headers: uplaodHeader });
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

        const response = await axios.post(`${BASE_URL}/upload/employee/` + id, formdata, { headers: uplaodHeader });
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

        const response = await axios.post(`${BASE_URL}/upload/monthly/` + id, formdata, { headers: uplaodHeader });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}
export const uploadMonthlyEsicReturn = async (id, formdata) => {
    try {
        const uplaodHeader = {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
        }

        const response = await axios.post(`${BASE_URL}/upload/esic/` + id, formdata, { headers: uplaodHeader });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const uploadSalary = async (id, formdata) => {
    try {
        const uplaodHeader = {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
        }

        const response = await axios.post(`${BASE_URL}/upload/salary/` + id, formdata, { headers: uplaodHeader });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}
export const getSummary = async (id, year, sub_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/monthly/getSummary/` + id + '/' + year + '/' + sub_id, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const createBill = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/bill/create`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const updateBill = async (id, params) => {
    try {
        const response = await axios.post(`${BASE_URL}/bill/update/` + id, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}
export const getAllBill = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/bill/getAllBill`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getBill = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/bill/getBill/` + id, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const searchBill = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/bill/searchBill/` + id, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const paymentReceived = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/bill/paymentReceived`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getCardsCount = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/dashboard/getCardsCount`, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getGraph = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/dashboard/graphCreate`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getBillGraph = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/dashboard/getBillGraph`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}
export const getSalaryByMonth = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/salary/getSalaryByMonth`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getSalarySummary = async (params) => {
    try {

        const response = await axios.post(`${BASE_URL}/salary/getSalarySummary`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const saveSalaryReturn = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/salary/saveSalaryReturn`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getYearsAndMonth = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/dashboard/getYearsAndMonth`, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getAll = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users/getAll`, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const register = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/register`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/getById/` + id, { headers: header });
        return response.data;
    } catch (error) {

        throw error.response.data.error;
    }
}

export const getUser = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users/current`, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getAllInquiries = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/inquiries/getAllInquiries`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}
export const inquiryRegister = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/inquiries/inquiryRegister`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const addBlogs = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/blogs/addBlogs`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getAllBlogs = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/blogs/getAllBlogs`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const downlaodFile = async (url) => {
    try {

        const urlParts = url.split('/')
        const response = await axios.get(`${BASE_URL}/` + url, { responseType: 'blob', headers: header });
        url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element
        const a = document.createElement('a');
        a.href = url;

        // Extract filename from response headers or use a default
        const filename = urlParts[urlParts.length - 1];

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

// ------------------------- Extrnal API ------------------------------

export const NewsData = async () => {
    try {
        const response = await axios.get(`https://newsdata.io/api/1/news?apikey=pub_53971c38bbbb34b05259bb48d72f797e88dc6&q=EPF`);
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}


export const deleteRecords = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/deleteRecords`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const deleteEmployeeById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/employee/delete/`+id , { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}
export const deleteCustomFieldsById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/custom/delete/`+ id, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}
export const deleteRecordsByMonthYear = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/monthly/deleteReturnByMonthYear`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}



//---------------------------------------------------------------- CUstom Fileds --------------------------------


export const getAllCustomFields = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/custom/getAll`, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getCustomFields = async (param) => {
    try {
        const response = await axios.get(`${BASE_URL}/custom/getFields/` + param, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}
export const addCustomFields = async (params) => {
    try {
        const response = await axios.post(`${BASE_URL}/custom/add`, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}


//---------------------------------------------------------------- Notification  --------------------------------
export const getAllNotification = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/notification/getAll`, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getUnreadNotification = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/notification/getUnread`, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

export const getNotificationById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/notification/` + id, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}


export const setRead = async (id, params) => {
    try {
        const response = await axios.put(`${BASE_URL}/notification/setRead/` + id, params, { headers: header });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}