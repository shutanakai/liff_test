import { useEffect, useRef, useState } from 'react';

export const useLiffToken = () => {
    const [token, setToken] = useState(null);
    const [liffSendMessage, setLiffSendMessage] = useState(null);
    const [liff, setLiff] = useState(null);

    useEffect(
        () => {
            const initLiff = async () => {
                const liff = (await import('@line/liff')).default;
                await liff.init({liffId: process.env.NEXT_PUBLIC_LIFF_ID})
                    .then(() => {
                        const idToken = liff.getDecodedIDToken();
                        setToken(idToken);
                        setLiffSendMessage(liff.sendMessages);
                    })
                    .catch((err) => {
                        alert(`LIFFの初期化失敗。\n${err}`);
                });
                if (!liff.isLoggedIn()) {
                    liff.login();
                };
                setLiff(liff);
            };

            initLiff();
        },
        [setToken, setLiffSendMessage, setLiff],
    );

    return { token, liffSendMessage, liff };
}