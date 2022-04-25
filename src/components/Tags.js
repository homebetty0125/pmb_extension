import PropTypes from 'prop-types';
import { Tag } from 'antd';
import styled from 'styled-components';

const TagsLayout = styled(Tag)({
    marginLeft: '4px',
    marginRight: '4px',
});

const Tags = ({
    code,
    color,
    text,
    className,
}) => (

    <TagsLayout
        className={`${className && className} ${code === 'work' ? 'with-white' : ''}`}
        color={color}
    >
        {text}
    </TagsLayout>

);

Tags.defaultProps = {
    color: '#000',
    textColor: '',
    text: '',
    className: '',
};

Tags.propTypes = {
    color: PropTypes.string,
    textColor: PropTypes.string,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    className: PropTypes.string,
};

export default Tags;
