import styled from 'styled-components';
import FormRow from './FormRow';

const FormLayout = styled.form({
    'h4.title': {
        marginBottom: '4px',
    },
});

const FormRowLayout = styled(FormRow)(({ theme }) => ({
    '&.row-workLog > .field': {
        height: 'auto',
        display: 'flex',
        marginLeft: '-5px',
        marginRight: '-5px',
        '> *': {
            flex: '1',
            margin: '0 5px',
        },
    },
    '.warning-text': {
        fontSize: '12px',
        color: theme.palette.blue,
    },
}));

export {
    FormLayout,
    FormRowLayout,
};
