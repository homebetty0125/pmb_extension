import axios from 'axios';
import { message } from 'antd';
import utilConst from './util.const';

const { domain } = utilConst;

/**
 * @author Betty
 * @param  {number} num1 - 小數點數字
 * @param  {number} num2 - 小數點數字
 * @returns {number}
 */
const mul = (num1, num2) => {

    let m = 0,
        r1, r2,
        s1 = num1.toString(),
        s2 = num2.toString();

    try {
        m += s1.split('.')[1].length;
    }
    catch (e) {
        m += 0;
    }

    try {
        m += s2.split('.')[1].length;
    }
    catch (e) {
        m += 0;
    }

    r1 = +(s1.replace('.', ''));
    r2 = +(s2.replace('.', ''));

    return r1 * r2 / Math.pow(10, m);

};

const add = (num1, num2) => {

    let r1,
        r2,
        m;

    try {

        r1 = num1.toString().split('.')[1].length;

    }
    catch (e) {

        r1 = 0;

    }

    try {

        r2 = num2.toString().split('.')[1].length;

    }
    catch (e) {

        r2 = 0;

    }

    m = Math.max(r1, r2);
    return +parseFloat(num1 + num2).toFixed(m);

};

const Util = {
    /**
     * @author Betty
     * @param  {object{} || string} service - 如果是字串，則為 service.url
     *   @param {string} service.url
     *   @param {string} [service.method = 'post']
     *   @param {string} [service.dataType = 'json']
     * @param  {object{}} reqData
     * @param  {object{}} option
     * @returns {promise}
     */
    serviceProxy: (service, option = {}) => {

        // 回傳 promise
        return new Promise((resolve, reject) => {

            const authHeader = {
                headers: {
                    Authorization: `Bearer ${option.key}`,
                },
            };

            axios({
                baseURL: `http://${domain}/pmb-dev/api`,
                url: service,
                method: 'post',
                ...option?.reqData && {
                    data: option.reqData,
                },
                ...authHeader,
            })
            .then(
                // result: 1
                ({ data }) => {

                    resolve(data.data);

                },
                // result: 0
                ({ response }) => {

                    const { data } = response;
                    reject(message.error(data.message));

                },
            )
            .catch((error) => {

                console.log('error:', error);

            });

        });

    },

    /**
     * @author Betty
     * @param {number} param1 - 小時
     * @param {number} param2 - 分鐘
     * @return {number}
     */
    transferHourToTime: (hour, minute) => {

        const newHour = mul(+hour, 60);
        const newMinute = (+minute === 30) ? +minute : 0;
        return add(newHour, newMinute);

    },

    /**
     * @author Betty
     * @param {number} param1 - 分鐘
     * @return {object} - 小時、分鐘
     */
    transferTimeToHour: (param) => {

        const hour = (param / 60);
        const rhour = Math.floor(hour);
        const minute = (hour - rhour) * 60;
        const rminute = Math.round(minute);
        return { hour: rhour || 0, minute: rminute || 0 };

    },
};

export default Util;
