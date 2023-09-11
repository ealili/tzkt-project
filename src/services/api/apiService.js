import api from './api';

const get = async (url, params) => {
    try {
        const response = await api.get(url, {params});
        return response.data;
    } catch (error) {
        throw error;
    }
};

const apiService = {
    get,
};

export default apiService;
