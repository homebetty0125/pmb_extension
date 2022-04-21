/*global chrome*/
import { Fragment } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import WorkLogForm from '../components/WorkLogForm';
import utilConst from '../utils/util.const';
import useChromeCookies from '../utils/useChromeCookies';

const { domain } = utilConst;

const TitleLayout = styled.h3(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.border}`,
    marginBottom: '0',
}));

const WrapLayout = styled.div({
    padding: '10px',
});

const Content = () => {

    // Custom Hook
    const cookie = useChromeCookies();

    // 登入按鈕
    const handleClickLogin = () => chrome.tabs.create({ url: `http://${domain}/auth/?/pmb/index` });

    return (

        <Fragment>
            <TitleLayout>PMB Extension</TitleLayout>

            <div>
                {
                    cookie?.value ? (

                        <WorkLogForm />

                    ) : (

                        <Fragment>
                            <h4>你尚未登入，請先登入!!!</h4>

                            <Button
                                type="primary"
                                onClick={handleClickLogin}
                            >
                                點我登入
                            </Button>
                        </Fragment>

                    )
                }
            </div>
        </Fragment>

    );

};

export default Content;
