import { Fragment, useState } from 'react';
import { Button, Radio, AutoComplete } from 'antd';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import {
    FormLayout,
    FormRowLayout,
    TaskRow,
} from './WorkLogFormLayout';
import FormRowStyle from './FormRowStyle';
import FormRow from './FormRow';
import Tags from './Tags';
import util from '../utils/util';
import utilConst from '../utils/util.const';
import fakeData from '../utils/fakeData';

const RadioGroup = Radio.Group;
const { transferHourToTime } = util;
const { workLogTypes, errorMesg } = utilConst;

// 整理成 Ant Design 的結構
const arrangeList = (data) => data.reduce((acc, {
    projectName,
    taskId,
    taskName,
}) => {

    acc.push({
        value: `${String(taskId)}_${taskName}_${projectName}`,
        label: (
            <TaskRow>
                <h4 className="title">{projectName}</h4>
                <div className="task-name">{taskName}</div>
            </TaskRow>
        ),
        // label: `${taskName} (${projectName})`,
    });

    return acc;

}, []);

// Autocomplete filter 事件
const handleFilterOption = (inputVal, option) => {

    const regex = new RegExp(inputVal);
    return regex.test(option.value);

};

const WorkLogForm = () => {

    // Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // State
    const [type, setType] = useState('');
    const [checking, setChecking] = useState(false);
    const [selected, setSelected] = useState('');

    // 工時種類
    const handleWorkLogTypeChanged = ({ target }) => {

        setType(target.value);
        setChecking(false);

    };

    // Autocomplete change 事件
    const handleChangeOption = (value) => {

        // 給畫面用
        setSelected({
            ...selected,
            assignee: value,
        });

    };

    // 送資料
    const handleReqData = (reqData) => {

        const today = dayjs().format('YYYY-MM-DD');

        reqData = {
            ...reqData,
            taskId: '',
            workLogStartDate: today,
            workLogEndDate: today,
            workLogType: type,
            workLogHours: transferHourToTime(reqData.hour, reqData.minute),
        };

        delete reqData.hour;
        delete reqData.minute;

        setChecking(!type);
        if (!type) return;

        console.log('reqData:', reqData);

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
                        placeholder="允許輸入項目或專案名稱"
                        options={arrangeList(fakeData)}
                        // value={(selected.assignee === '') ? '' : selected.assignee?.split('_')[1]}
                        onChange={handleChangeOption}
                        filterOption={handleFilterOption}
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
                    <RadioGroup onChange={handleWorkLogTypeChanged}>
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
