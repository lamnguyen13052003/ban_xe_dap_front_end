import axios, {AxiosInstance} from "axios";


class Http {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: 'https://ban-xe-dap-server.onrender.com/',
            timeout: 10000
        })
    }
}

const axiosHttp = new Http().instance
export default axiosHttp;