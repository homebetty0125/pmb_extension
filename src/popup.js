/*global chrome*/

const init = async() => {

    let [cookie] = await chrome.cookies.getAll({ name: 'auth_token' });
    // console.log('init cookie:', cookie);
    return cookie;
    // container.innerHTML = cookie?.value ?? '';

    // 手動清資料(cookie)或被登出
    // chrome.cookies.onChanged.addListener((params) => {

    //     // console.log('onchange params:', params);
    //     container.innerHTML = params.removed ? '' : params?.cookie?.value;

    // });

};

export default init;
