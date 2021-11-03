import Axios, { AxiosResponse, AxiosRequestConfig } from "axios";
Axios.defaults.withCredentials = false;
Axios.defaults.baseURL = "https://api.themoviedb.org/3";

export default class HttpClient {
    private apiKey = "a8093509fcc0d74a837d254a2416c82c";

    async get<T>(url: string, params?: {}): Promise<T> {
        const config: AxiosRequestConfig = {};
        if (params) {
            config.params = params;
        } else {
            config.params = {};
        }
        config.params["api_key"] = this.apiKey;

        const res: AxiosResponse<T> = await Axios.get<T>(url, config);
        return res.data;
    }
}
