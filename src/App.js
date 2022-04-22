import 'antd/dist/antd.css';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from './utils/theme';
import Content from './containers/Content';
import './utils/locale';

const GlobalStyle = createGlobalStyle`
    body {
        min-width: 300px;
        line-height: 1.4;
        margin: 0;
    }
    header, main {
        padding: 10px 20px;
    }
    main {
        padding-top: 16px;
        padding-bottom: 16px;
    }
    h1~h6 {
        margin-bottom: 20px;
    }
    select {
        outline: 0;
    }
    input {
        background-color: transparent;
        border: none;
        box-shadow: none;
        outline: 0;
    }
    a {
        text-decoration: none;
    }
`;

const HeaderLayout = styled.header(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.border}`,
    '.title': {
        marginBottom: '0',
    },
}));

const App = () => {

    return (

        <ThemeProvider theme={theme}>
            <GlobalStyle />

            <HeaderLayout>
                <h3 className="title">PMB Extension</h3>
            </HeaderLayout>

            <Content />
        </ThemeProvider>

    );

};

export default App;
