import { Fragment } from 'react';
import popup from './popup';

const Wrap = () => {

    console.log('check:', popup());

    return (

        <Fragment>
            <h2 class="title">取得 cookie</h2>
            <button class="btn js-getCookie">Get cookies</button>
            <button class="btn js-reset">清除</button>

            <div class="wrap">
                此頁面 cookie:
                <div class="container"></div>
            </div>
        </Fragment>

    );

};

export default Wrap;
