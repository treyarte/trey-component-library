import axios, {AxiosRequestConfig} from "axios";
import https, {AgentOptions} from "https";

const baseLocalHostUrl = 'https://localhost:44386/api'
const baseDevHostUrl = '';
const baseProdHostUrl = '';

/**
 * A base class that includes basic functionality for communicating with an API 
 */
export abstract class BaseWebService {
    private baseUrl = '';
    private controller = '';
    private apiLocation = '';

    private agent: AgentOptions = new https.Agent({
        rejectUnauthorized: false,
    });

    baseAxiosConfiguration: AxiosRequestConfig = {
        withCredentials: true,
        headers: {'Content-Type': 'application/json'},
        httpsAgent: this.agent,
    };


    constructor(providedController: string) {
        if (process.env.NEXT_PUBLIC_DEV_ENV  === 'production') {
            this.baseUrl = baseProdHostUrl;
        } else if (process.env.NEXT_PUBLIC_DEV_ENV  === 'development') {
            this.baseUrl = baseDevHostUrl;
        } else {
            this.baseUrl = baseLocalHostUrl;            
        }

        this.controller = providedController;
    }

    ServerSideConfig(){
        return {
         httpsAgent: this.agent,
        }
     }

    private buildPath(action: string, newController: string = "") {
        let path = `${this.baseUrl}/`;
        if (newController !== "") {
            path += `${newController}/${action}`;
        } else {
            path += `${this.controller}/${action}`;
        }

        return path
    }

    private GetConfig(params: any = null): AxiosRequestConfig {
        let baseConfig: AxiosRequestConfig = {
            withCredentials: true,
            headers: {'Content-Type': 'application/json'},
            httpsAgent:this.agent
        }

        if (params != null) {
            baseConfig.params = params;
        }

        return baseConfig;
    }

    public Get(action: string, params: any = null): Promise<any> {
        let path = this.buildPath(action);
        let config = this.GetConfig(params);
        return axios.get(path, config);
    }

    public GetAllServerSide(action: string): Promise<any> {
        let path = this.buildPath(action);
        let config = this.ServerSideConfig();
        return axios.get(path, config);
    }


    public GetAll(action:string):Promise<any>{
        let path = this.buildPath(action);
        let config = this.GetConfig();
        return axios.get(path,config);
    }

    public GetUrl(action:string, id?:string) {
        action = id ? `${action}?id=${id}` : action;
        return this.buildPath(action);
    }

    public GetWithObjectServerSide(action:string, modal:any) {
        let config = this.ServerSideConfig();
        return this.GetWithObject(action, modal, config);
    }

    /**
     * Performs a get with request with an object as the query params
     * You may want to rewrite incase it does not work with your object
     * @param modal
     * @param action
     * @returns
     */
    public GetWithObject(action:string, modal:any, axiosConfig?:AxiosRequestConfig<any>) {
        let path = new URL(this.buildPath(action));
        let config = axiosConfig ? axiosConfig :this.GetConfig();

        Object.keys(modal).forEach(key => {

                if(Array.isArray(modal[key])) {
                    if(modal[key].length > 0) {
                        Object.values(modal[key]).forEach((v:any) => path.searchParams.append(key, v))
                    }
                } else {
                    path.searchParams.append(key, modal[key])
                }
        });

        return axios.get(path.toString(), config);
    }

    public Post(action: string, params: any): Promise<any> {
        let path = this.buildPath(action);
        let config = this.GetConfig();
        return axios.post(path, params, config);
    }

    async PostServerSide(action:string, params:any): Promise<any> {
        let path = this.buildPath(action);
        let config = this.ServerSideConfig();
        return axios.post(path, params, config);
    }

    public PostControllerOverride(controller: string, action: string, params: any): Promise<any> {
        let path = controller;
        path += `/${action}`
        let config = this.baseAxiosConfiguration;

        return axios.post(path, params, this.GetConfig());
    }

    public Put(action: string, params: { id:any, objIn:any }):Promise<any> {
        let path = this.buildPath(action);
        path+= `/${params.id}`
        let config = this.GetConfig();
        return axios.put(path, params.objIn, config);
    }

    public async Patch (action:string, params: {}) {
        let path = this.buildPath(action);
        let config = this.GetConfig();
        return axios.patch(path, params, config);
    }

    public Delete(action: string, id: string) {
        let path = this.buildPath(action);
        return axios.delete(path, this.GetConfig({id}));
    }
}
