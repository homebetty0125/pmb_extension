const utilConst = {
    domain: '192.168.1.65',

    // 工時
    workLogTypes: [
        {
            code: 'work',
            colorCode: '#009900',
            name: '確認',
        },
        {
            code: 'overtime',
            colorCode: '#3B7DBF',
            name: '加班',
        },
        {
            code: 'overtime_honor',
            colorCode: '#40A6FF',
            name: '加班-榮',
        },
        {
            code: 'extra',
            colorCode: '#006600',
            name: '超時',
        },
    ],

    // 錯誤訊息
    errorMesg: {
        error_required: '此欄位為必填',
        error_pattern: '格式有誤',
    },
};

export default utilConst;
