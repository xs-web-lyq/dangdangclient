import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosPromise } from "axios";
import conf from "@/config";
import { ElMessage } from "element-plus";
import * as exp from "constants";
const SEVER_ERR = "请求服务器的网址错误或网络连接失败";

class AxiosUtil {
  static axiosUtil: AxiosUtil = new AxiosUtil();
  axiosInstance!: AxiosInstance;
  request!: ReqExecute;
  constructor() {
    this.request = {
      get: (): any => {},
      post: (): any => {},
      delete: (): any => {},
      put: (): any => {},
      patch: (): any => {},
    };
    this.createAxiosInstanc();
    this.beforeReqIntercpt();
    this.beforeResponseIntercpt();
    this.reqPrepare();
  }
  createAxiosInstanc() {
    this.axiosInstance = axios.create({ timeout: 500 });
  }
  // 1. 请求开始之前的请求拦截器
  beforeReqIntercpt() {
    this.axiosInstance.interceptors.request.use((request) => {
      return request;
    });
  }
  // 2. 数据响应之前的响应拦截器
  beforeResponseIntercpt() {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        const { data, msg, code } = response.data;
        if (code == 200) return response.data;
        else if (code == 500) {
          ElMessage.error(`发生了错误${msg}`);
        } else {
          ElMessage.error("发生了未知错误");
        }
      },
      (err) => {
        ElMessage.error(`${SEVER_ERR}`);
      }
    );
  }
  // 3. 发送请求给服务器[发送 post get put delete patch]
  sendRequest(options: AxiosRequestConfig_) {
    if (conf.env === "production") {
      this.axiosInstance.defaults.baseURL = conf.baseApi;
    } else if (conf.env === "development") {
      const isMock: boolean = options.isMock || conf.isMock;
      this.axiosInstance.defaults.baseURL = isMock ? conf.mockBaseApi : conf.baseApi;
    }
    return this.axiosInstance(options);
  }
  // 4. 深入灵活应用TS完成请求method类型自动提示
  reqPrepare() {
    return methods.forEach((method) => {
      this.request[method] = (url, isMock, data) => {
        return this.sendRequest({
          url,
          isMock,
          data,
        });
      };
    });
  }
}
interface AxiosRequestConfig_ extends AxiosRequestConfig {
  isMock: boolean;
}

type Method = "get" | "post" | "put" | "delete" | "patch";
const methods: Method[] = ["get", "post", "put", "delete", "patch"];

type ReqFn = (url: string, isMock: boolean, data?: any) => AxiosPromise<any>;
interface ReqExecute {
  get: ReqFn;
  post: ReqFn;
  put: ReqFn;
  delete: ReqFn;
  patch: ReqFn;
}
export default AxiosUtil.axiosUtil.request;
