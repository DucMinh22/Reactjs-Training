import axios from 'axios';

class AxiosService {
    constructor() {
        const instance = axios.create({
            // headers: {
            //     'Authorization': `Bearer ${token}`,
            //     'Content-Type': 'application/json',
            // }
        });
        instance.interceptors.response.use(this.handleSuccess, this.handleError);
        this.instance = instance;
    }

    handleSuccess(response) {
        return response;
    }

    handleError(error) {
        return Promise.reject(error);
    }

    get(url) {
        return this.instance
            .get(url)
            .then(res => res);
    }

    post(url, body) {
        return this.instance
            .post(url, body)
            .then(res => res);
    }

    put(url, body) {
        return this.instance
            .put(url, body)
            .then(res => res);
    }

    putWithoutBody(url) {
        return this.instance
            .put(url)
            .then(res => res);
    }

    deleteWithBody(url, body) {
        return this.instance
            .delete(url, body)
            .then(res => res);
    }

    delete(url) {
        return this.instance
            .delete(url)
            .then(res => res);
    }
}

export default new AxiosService();