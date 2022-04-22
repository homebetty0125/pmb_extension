import { Fragment, useState } from 'react';
import { Button, AutoComplete } from 'antd';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import { FormLayout, FormRowLayout } from './WorkLogFormLayout';
import FormRowStyle from './FormRowStyle';
import FormRow from './FormRow';

const WorkLogForm = () => {

    // Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // State
    const [type, setType] = useState('');

    // 工時種類
    const handleWorkLogTypeChanged = ({ target }) => {

        setType(target.value);

    };

    // 送資料
    const handleReqData = (reqData) => {

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

                <FormRowLayout
                    labelTitle={
                        <Fragment>
                            工時 (必填) <span className="warning-text">(最小單位為 30 分鐘)</span>
                        </Fragment>
                    }
                    className="row-workLog"
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

                    {
                        errors.hour && <div className="required">必填欄位</div>
                    }

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
                    required
                    noBorder
                >
                    <RadioGroup
                        name="logType"
                        className="form-radios"
                        onChange={handleWorkLogTypeChanged}
                    >
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
                                    className={code === 'estimate' ? 'estimate' : ''}
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
