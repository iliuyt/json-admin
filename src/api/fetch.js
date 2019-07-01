import axios from "axios";
import { Notification } from "element-ui";

// 创建axios实例
console.log("process.env.NODE_ENV", process.env.NODE_ENV);

const fetch = axios.create({
    timeout: 60000 // 请求超时时间
});

fetch.interceptors.request.use(
    config => {
        // 请求前处理
        // result 接口规范返回
        return config;
    },
    error => {
        // 错误处理
        Promise.reject(error);
    }
);

// respone interceptor
fetch.interceptors.response.use(
    async response => {
        // 业务逻辑是否成功判断
        let { code, msg, data } = response.data;

        if (code === 0) {
            return data;
        } else {
            Notification.error(msg || "未知错误");
            return Promise.reject(new Error(msg || "未知错误"));
        }
    },
    err => {
        let response = err && err.response;
        // 响应错误拦截
        if (response) {
            switch (response.status) {
                case 401:
                case 403:
                    Notification.info("请重新登录");
                    if (process.env.NODE_ENV === "prod") {
                        window.location.href = "/login";
                    }
                    break;
                case 404:
                    Notification.error("请求不存在");
                    break;
                case 500:
                    Notification.error("服务器异常");
                    break;
            }
        } else {
            Notification.error("请求超时");
        }
        return Promise.reject(response || err);
    }
);

export default fetch;
