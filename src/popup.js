/*global chrome*/

// const container = document.querySelector('.container');

// // Current Tab
// const getCurrentTab = async () => {

//     let queryOptions = { active: true, currentWindow: true };
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;

// };

// init
export default async () => {

    let [cookie] = await chrome.cookies.getAll({ name: 'auth_token' });
    console.log('init cookie:', cookie);
    // container.innerHTML = cookie?.value ?? '';

    // 手動清資料(cookie)或被登出
    // chrome.cookies.onChanged.addListener((params) => {

    //     // console.log('onchange params:', params);
    //     container.innerHTML = params.removed ? '' : params?.cookie?.value;

    // });

}