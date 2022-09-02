import PropTypes from 'prop-types';
import { ErrorMessage } from '@hookform/error-message';
import utilConst from '../utils/util.const';

const { errorMesg } = utilConst;

const FormRow = ({
    name,
    labelTitle,
    className,
    noBorder,
    required,
    errors,
    children,
    ...rest
}) => (

    <label
        className={`row ${errors?.[name] ? 'hasError' : ''} ${className && className}`}
        {...rest}
    >
        <div className={`title ${required ? 'isRequired' : ''}`}>
            {
                (typeof labelTitle === 'string') ? `${labelTitle}${required ? ' (必填)' : ''}` : labelTitle
            }
        </div>
        <div className={`field ${noBorder ? 'noBorder' : ''}`}>{children}</div>
        {
            errors?.[name] &&
                <FormErrorMesg
                    name={name}
                    errors={errors}
                />
        }
    </label>

);

// 錯誤訊息
const FormErrorMesg = ({ name, errors }) => (

    <ErrorMessage
        name={name}
        errors={errors}
        message={errorMesg[`error_${errors[name]?.type}`]}
        render={({ message }) => <p className="error-mesg">{message}</p>}
    />

);

FormRow.defaultProps = {
    required: false,
    noBorder: false,
    className: '',
};

FormRow.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    labelTitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    required: PropTypes.bool,
    noBorder: PropTypes.bool,
    errors: PropTypes.object,
    children: PropTypes.any.isRequired,
};

FormErrorMesg.propTypes = {
    name: PropTypes.string,
    errors: PropTypes.object,
};

export {
    FormRow as default,
    FormErrorMesg,
};
