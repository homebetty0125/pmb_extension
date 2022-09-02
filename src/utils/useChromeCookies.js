/*global chrome*/
import { useState, useEffect } from 'react';

export default function useChromeCookies() {

    // State
    const [cookie, setCookie] = useState(null);

    useEffect(() => {

        init();
        triggerChangedCookie();

    }, []);

    // init
    const init = async () => {

        let [temp] = await chrome.cookies.getAll({
            name: 'access_token',
        });

        setCookie(temp);

    };

    // event
    const triggerChangedCookie = async () => {

        // 手動清資料(cookie)或被登出
        await chrome.cookies.onChanged.addListener((params) => {

            setCookie(params.removed ? '' : params.cookie);

        });

    };

    return cookie;

}
