import { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'antd';
import init from './popup';

const TitleLayout = styled.h3(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.border}`,
    marginBottom: '0',
}));

const WrapLayout = styled.div({
    // paddingTop: '12px',
    // paddingBottom: '12px',
});

const Content = async () => {

    console.log('check:', await init());

    return (

        <Fragment>
            <TitleLayout>PMB Extension</TitleLayout>

            <WrapLayout>
                此頁面 cookie:
                <div class="container"></div>
            </WrapLayout>
        </Fragment>

    );

};

export default Content;
