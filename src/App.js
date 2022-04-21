import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from './utils/theme';
import Layout from './containers/Layout';
import Content from './containers/Content';

const GlobalStyle = createGlobalStyle`
    body {
        min-width: 300px;
        line-height: 1.4;
        margin: 0;
    }
`;

const App = () => {

    return (

        <ThemeProvider theme={theme}>
            <GlobalStyle />

            <Layout>
                <Content />
            </Layout>
        </ThemeProvider>

    );

};

export default App;
