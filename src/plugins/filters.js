import Vue from "vue";
import moment from "moment";
import { FILTER_NAME } from "@/config/constant";

// 格式化时间
Vue.filter(FILTER_NAME.DATE_TIME, (value, temp = "YYYY-MM-DD HH:mm") => {
    if (value) {
        return moment(value).format(temp);
    } else {
        return value;
    }
});

// 金额转换
Vue.filter(FILTER_NAME.AMOUNT, (value, symbol, decimals = 2) => {
    if (!isFinite(value) || (!value && value !== 0)) return "";
    // 分隔符
    let separator = ",";
    // 开头标识符
    symbol = symbol != null ? symbol : "";
    // 转换小数
    value = parseFloat(value);

    // 正则每三个数字捕获一次
    let digitsRE = /(\d{3})(?=\d)/g;

    // 获取数字字符串，并截取位数
    let stringified = Math.abs(value).toFixed(decimals);
    // 获取整数位
    let _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;

    let i = _int.length % 3;

    // 获取头部字符串，如果整数位大于3位数，添加分隔符
    let _head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? separator : "") : "";
    // 获取小数部分
    let _float = decimals ? stringified.slice(-1 - decimals) : "";

    // 逗号分隔整数位
    let _intFmt = _int.slice(i).replace(digitsRE, "$1" + separator);

    // 正负数确认
    let sign = value < 0 ? "-" : "";

    // 拼接字符串返回
    return sign + symbol + _head + _intFmt + _float;
});
// 百分比
Vue.filter(FILTER_NAME.PERCENT, (value, symbol, decimals = 2) => {
    if (!isFinite(value) || (!value && value !== 0)) return "";
    // 转换小数
    value = parseFloat(value * 100);

    // 开头标识符
    symbol = symbol != null ? symbol : "%";

    // 获取数字字符串，并截取位数
    let stringified = value.toFixed(decimals);

    // 拼接字符串返回
    return stringified + symbol;
});

// 截取字符串
Vue.filter(FILTER_NAME.SUBSTR, (value, len = 20, ellipsis = "...") => {
    if (value) {
        value = String(value);
        if (value.length > len) {
            value = value.substr(0, len);
            value += ellipsis;
        }
    }
    return value;
});

const filter = function(name, value, ...arg) {
    return Vue.filter(name)(value, ...arg);
};

const install = function(Vue) {
    if (install.installed) return;
    install.installed = true;

    //定义属性到Vue原型中
    Object.defineProperties(Vue.prototype, {
        $filter: {
            get() {
                return filter;
            }
        }
    });
};

export default {
    install
};
