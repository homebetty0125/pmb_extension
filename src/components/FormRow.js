import { Fragment } from 'react';
import PropTypes from 'prop-types';

const FormRow = ({
    labelTitle,
    required,
    children,
    error,
    errorMesg,
    className,
    notes,
    noBorder,
    ...rest
}) => (

    <label
        className={`row ${error ? 'hasError' : ''} ${className ? className : ''}`}
        {...rest}
    >
        <Fragment>
            <div className={`title ${required ? 'isRequired' : ''}`}>
                {
                    (typeof labelTitle === 'string') ? `${labelTitle}${required ? ' (必填)' : ''}` : labelTitle
                }
            </div>

            <div className={`field ${noBorder ? 'noBorder' : ''}`}>{children}</div>

            {
                // notes &&
                //     <div className="notes">
                //         <ExclamationCircleOutlined />{notes}
                //     </div>
            }
        </Fragment>

        {
            // error && <ErrorMesg {...errorMesg ? { error: errorMesg } : null} />
        }
    </label>

);

FormRow.defaultProps = {
    required: false,
    noBorder: false,
    error: false,
    // errorMesg: errorText,
    className: '',
};

FormRow.propTypes = {
    className: PropTypes.string,
    labelTitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    required: PropTypes.bool,
    noBorder: PropTypes.bool,
    // error: PropTypes.bool,
    // errorMesg: PropTypes.string,
    children: PropTypes.any.isRequired,
    notes: PropTypes.string,
};

export default FormRow;
