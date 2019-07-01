// prop-types 使用文档 https://react.docschina.org/docs/typechecking-with-proptypes.html

import * as ApiConfig from "./config";
import fetch from "./fetch";
import { checkPropTypes } from "prop-types";
import qs from "qs";

let Api = {};

// 设置api属性，遍历方法名和方法
Object.entries(ApiConfig).forEach(([name, defination]) => {
    Object.defineProperty(Api, name, {
        enumerable: true,
        configurable: false,
        get: () => {
            return async function(args) {
                let { method, path, body, params, result, dataType } = defination;
                // 设置默认值
                method = method || "GET";
                dataType = (dataType || "FORM").toUpperCase();

                // content
                let contentType = "application/x-www-form-urlencoded";
                if (dataType === "JSON") {
                    contentType = "application/json;";
                }
                // 请求参数
                let fetchData = {
                    url: path,
                    method,
                    headers: {
                        "Content-Type": contentType
                    }
                };

                // 默认参数为对象
                args = args || {};

                // 参数检查并组装请求
                if (method.toUpperCase() === "GET") {
                    checkPropTypes(params, args, name, path);
                    fetchData.params = args;
                } else {
                    checkPropTypes(body, args, name, path);
                    // FORM处理
                    if (dataType === "FORM") {
                        args = qs.stringify(args);
                    }
                    fetchData.data = args;
                }

                // 发生请求
                let data = await fetch(fetchData);

                return Promise.resolve(data);
            };
        }
    });
});

const install = function(Vue) {
    if (install.installed) return;
    install.installed = true;

    //定义属性到Vue原型中
    Object.defineProperties(Vue.prototype, {
        $api: {
            get() {
                return Api;
            }
        }
    });
};

export default {
    Api,
    install
};
