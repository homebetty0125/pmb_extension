import { blue, red, grey } from '@ant-design/colors';
import { createGlobalStyle } from 'styled-components';

const white = '#FFF';
const height = '32px';

const FormRowStyle = createGlobalStyle`
    .noBorder {
        height: ${height};
        background-color: ${white};
        padding: 4px 12px;
        transition: all .3s ease-in-out;
        outline: 0;
    }
    .row {
        display: block;
        margin-bottom: 16px;
        .title {
            margin-bottom: 4px;
            cursor: default;
        }
        .field {
            height: ${height};
            font-size: 14px;
            background-color: ${white};
            border: 1px solid ${({ theme }) => theme.palette.border};
            border-radius: 2px;
            padding: 4px 8px;
            transition: all .3s ease-in-out;
            outline: 0;
            &:hover,
            &:focus {
                border-color: ${blue.primary};
            }
            &:focus {
                box-shadow: 0 0 1px 2px rgba(33, 150, 243, .3);
            }
            > * {
                &:not(.ant-switch) {
                    width: 100%;
                }
            }
        }
        .disabled, .readonly {
            background-color: ${({ theme }) => theme.palette.disabled};
            border-color: ${({ theme }) => theme.palette.border};
            cursor: not-allowed;
            &:hover,
            &:focus {
                border-color: ${({ theme }) => theme.palette.border};
            }
            [disabled] {
                background-color: ${({ theme }) => theme.palette.disabled};
                cursor: not-allowed;
                &:hover {
                    border-color: ${({ theme }) => theme.palette.border};
                }
            }
        }
        .ant-picker {
            width: 100%;
            height: ${height};
            &:focus,
            &:active {
                border: 1px solid ${blue.primary};
                box-shadow: none;
                outline: 0;
            }
            &.ant-picker-focused {
                box-shadow: none;
                .ant-picker-active-bar {
                    display: none;
                }
            }
            .ant-picker-input {
                &:focus {
                    outline: 0;
                }
                input {
                    font-size: 15px;
                    letter-spacing: 1px;
                }
            }
        }
        .noBorder {
            border: 0;
            padding: 0;
            select {
                padding: 4px 8px;
            }
        }
        .ant-input,
        select {
            height: ${height};
            font-size: 15px;
        }
        select {
            font-size: 15px;
            border-color: ${({ theme }) => theme.palette.border};
            border-radius: 2px;
            padding: 4px 12px;
            transition: all .3s ease-in-out;
            &:hover {
                border-color: ${blue.primary};
            }
        }
    }
    .row-btns {
        text-align: center;
        .ant-btn {
            width: 100%;
            height: auto;
            line-height: initial;
            letter-spacing: -1px;
            padding: 8px 40px;
        }
    }
    .isRequired {
        &:before {
            content: '*';
            font-size: 13px;
            color: ${red.primary};
            display: inline-block;
            vertical-align: middle;
            margin-right: 4px;
        }
    }
    .hasError {
        .field {
            border-color: ${red.primary};
            &:hover {
                border-color: ${red.primary};
            }
        }
        .error {
            font-size: 15px;
            color: ${red.primary};
            margin: 2px 0;
        }
        .noBorder select {
            border-color: ${red.primary};
        }
    }
    .error-mesg {
        font-size: 14px;
        color: #ef5350;
        margin-top: 4px;
    }
`;

export default FormRowStyle;
