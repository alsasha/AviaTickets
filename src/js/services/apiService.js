import config from '../config/apiConfig';
import axios from 'axios';

class Api {
    constructor(config) {
        this.url = config.url;
    }
    async countries() {
        try {
            const response = await axios.get(`${this.url}/countries`);
            return response.data;
        } catch(err) {
            throw new Error(err);
        }  
    }
    async cities() {
        try {
            const response = await axios.get(`${this.url}/cities`);
            return response.data;
        } catch(err) {
            throw new Error(err);
        }  
    }

    async prices(params) {
        try {
            const response = await axios.get(`${this.url}/prices/cheap`, {
                params
            });
            return response.data;
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async airlines() {
        try {
            const response = await axios.get(`${this.url}/airlines`);
            return response.data;
        } catch(err) {
            throw new Error(err);
        }  
    }
}

const api = new Api(config);

export default api;
