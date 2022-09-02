import { Fragment, useState, useEffect } from 'react';
import { Button, Radio, AutoComplete, message } from 'antd';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import { FormLayout, FormRowLayout } from './WorkLogFormLayout';
import FormRowStyle from './FormRowStyle';
import FormRow from './FormRow';
import Tags from './Tags';

import util from '../utils/util';
import utilConst from '../utils/util.const';
import Service from '../utils/util.service';
import useChromeCookies from '../utils/useChromeCookies';

const RadioGroup = Radio.Group;
const { transferHourToTime } = util;
const { workLogTypes, errorMesg } = utilConst;

// 第一階段整理: project id 當 key
const arrangeList = (data) => data.reduce((acc, {
    projectId,
    projectName,
    taskId,
    taskName,
}) => {

    acc[projectId] = acc[projectId] || {};
    acc[projectId].project = projectName;
    acc[projectId].tasks = acc[projectId].tasks || [];
    acc[projectId].tasks.push({
        label: taskName,
        value: `${taskId}_${taskName}`,
    });

    return acc;

}, {});

// 整理成 Ant Design 的結構
const antdAutoCompleteOpts = (data) => Object.keys(data).reduce((acc, curr) => {

    const obj = data[curr];

    acc.push({
        label: obj.project,
        options: obj.tasks,
    });

    return acc;

}, []);

// Autocomplete filter 事件
const handleFilterOption = (inputVal, option) => {

    const regex = new RegExp(`${inputVal}`, 'gi');
    return regex.test(option.value);

};

// fetch
const fetchData = async(cookie) => {

    return await Service.myTask(cookie);

};

//
const WorkLogForm = () => {

    // Custom Hook
    const cookie = useChromeCookies();

    // State
    const [type, setType] = useState('');
    const [checking, setChecking] = useState(false);
    const [selected, setSelected] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {

        if (options.length) return;
        if (cookie?.value) {

            fetchData(cookie?.value)
                .then(({ lists }) => setOptions(lists));

        }

    }, [cookie, options]);

    // Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm();

    // 工時種類
    const handleWorkLogTypeChanged = ({ target }) => {

        setType(target.value);
        setChecking(false);

    };

    // Autocomplete change 事件: 給畫面用
    const handleChangeOption = (value) => setSelected(value);

    // Rest
    const handleResetForm = () => {

        reset();
        setType('');
        setSelected('');

    };

    // 送資料
    const handleReqData = async(reqData) => {

        const today = dayjs().format('YYYY-MM-DD');

        reqData = {
            ...reqData,
            taskId: +selected.split('_')[0],
            workLogStartDate: today,
            workLogEndDate: today,
            workLogType: type,
            workLogHours: transferHourToTime(reqData.hour, reqData.minute),
        };

        delete reqData.hour;
        delete reqData.minute;

        setChecking(!type);
        if (!type) return;

        await message.loading({
            content: 'Loading...',
            key: 'update',
            duration: 1,
        });

        await Service.fillWorkLog(cookie?.value, reqData)
            .then(() => {

                handleResetForm();
                message.success('更新成功');

            });

    };

    return (

        <Fragment>
            <FormRowStyle />

            <FormLayout onSubmit={handleSubmit(handleReqData)}>
                <div className="row">
                    <h4 className="title">日期</h4>
                    {dayjs().format('YYYY-MM-DD (dd)')}
                </div>

                <FormRow
                    labelTitle="專案項目"
                    className="row-my-tasks"
                    required
                    noBorder
                >
                    <AutoComplete
                        allowClear={true}
                        placeholder="請輸入項目或專案名稱"
                        options={antdAutoCompleteOpts(arrangeList(options))}
                        filterOption={!!selected && handleFilterOption}
                        value={selected.split('_')[1]}
                        onChange={handleChangeOption}
                    />
                </FormRow>

                <FormRowLayout
                    name="hour"
                    errors={errors}
                    labelTitle={
                        <Fragment>
                            工時 (必填) <span className="warning-text">(最小單位為 30 分鐘)</span>
                        </Fragment>
                    }
                    className="row-workLog-hour"
                    required
                    noBorder
                >
                    <span className="field label-hour">
                        <input
                            type="number"
                            name="hour"
                            placeholder="小時"
                            {...register('hour', {
                                required: true,
                                min: 0,
                            })}
                        />
                    </span>

                    <select
                        className="label-minute"
                        name="minute"
                        {...register('minute', { required: true })}
                    >
                        <option value="00">00</option>
                        <option value="30">30</option>
                    </select>
                </FormRowLayout>

                <FormRow
                    labelTitle="種類"
                    className="row-workLog-type"
                    required
                    noBorder
                >
                    <RadioGroup onChange={handleWorkLogTypeChanged} value={type}>
                        {
                            workLogTypes.map(({
                                id,
                                code,
                                name,
                                colorCode,
                                colorText,
                            }) => (

                                <Radio
                                    key={id}
                                    value={code}
                                    className="formRow-radio"
                                >
                                    <span>{name}</span>
                                    <Tags
                                        color={colorCode}
                                        textColor={colorText}
                                        text={name}
                                    />
                                    {
                                        (code === 'overtime' || code === 'overtime_honor') &&
                                            <span className="small-text">(限假日)</span>
                                    }
                                    {
                                        (code === 'extra') &&
                                            <span className="small-text">(限平日超過8H)</span>
                                    }
                                </Radio>

                            ))
                        }
                    </RadioGroup>

                    {checking && <div className="error-mesg">{errorMesg.error_required}</div>}
                </FormRow>

                <div className="row row-btns">
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        送出
                    </Button>
                </div>
            </FormLayout>
        </Fragment>

    );

};

export default WorkLogForm;
