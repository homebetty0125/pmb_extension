import styled from 'styled-components';
import FormRow from './FormRow';

const FormLayout = styled.form({
    'h4.title': {
        marginBottom: '4px',
    },
    '.row-workLog-type .field': {
        height: 'auto',
    },
    '.formRow-radio': {
        margin: '2px 0',
    },
    '.required': {
        fontSize: '14px',
        display: 'block',
        marginTop: '-14px',
    },
    '.small-text': {
        fontSize: '13px',
        color: '#5c5c5c',
        marginLeft: '4px',
    },
});

const FormRowLayout = styled(FormRow)(({ theme }) => ({
    '&.row-workLog-hour > .field': {
        height: 'auto',
        display: 'flex',
        marginLeft: '-5px',
        marginRight: '-5px',
        '> *': {
            flex: '0 0 calc((100% / 2) - 10px)',
            margin: '0 5px',
        },
    },
    '.warning-text': {
        fontSize: '12px',
        color: theme.palette.blue,
    },
}));

const TaskRow = styled.div({
    '.title': {
        fontSize: '13px',
        color: '#a6a6a6',
        marginBottom: '0',
    },
    '.task-name': {
        whiteSpace: 'break-spaces',
    },
});

export {
    FormLayout,
    FormRowLayout,
    TaskRow,
};
