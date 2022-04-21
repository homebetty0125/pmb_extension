import { Fragment } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const WorkLogForm = () => {

    // Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    return (

        <p>worklog</p>

    );

};

export default WorkLogForm;
