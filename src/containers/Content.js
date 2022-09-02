/*global chrome*/
import { Fragment } from 'react';
import { Button } from 'antd';
import WorkLogForm from '../components/WorkLogForm';
import utilConst from '../utils/util.const';
import useChromeCookies from '../utils/useChromeCookies';

const { domain } = utilConst;

const Content = () => {

    // Custom Hook
    const cookie = useChromeCookies();

    // 登入按鈕
    const handleClickLogin = () => chrome.tabs.create({ url: `http://${domain}/pmb` });

    return (

        <main>
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
        </main>

    );

};

export default Content;
