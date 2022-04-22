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

const minus = (num1, num2) => {

    let m = 0,
        r1 = num1.toString().split('.')[1],
        r2 = num2.toString().split('.')[1],
        s1 = r1 ? r1.length : 0,
        s2 = r2 ? r2.length : 0,
        max = Math.max(s1, s2),
        pow = Math.pow(10, max);

    return ((num1 * pow) - (num2 * pow)) / pow;

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
