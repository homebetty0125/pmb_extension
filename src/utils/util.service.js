import util from './util';

const Service = {
    // 我的專案與項目
    myTask: (key) => util.serviceProxy('/my_project_and_task', { key }),

    // 填工時
    fillWorkLog: (key, reqData) => util.serviceProxy('/web_work_logs/create', { key, reqData }),
};

export default Service;
