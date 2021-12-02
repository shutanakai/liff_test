import { useEffect, useRef, useState } from 'react';

export const useLiffToken = () => {
    const [token, setToken] = useState(null);
    const [liffSendMessage, setLiffSendMessage] = useState(null);

    useEffect(
        () => {
            const initLiff = async () => {
                const liff = (await import('@line/liff')).default;
                await liff.init({liffId: process.env.NEXT_PUBLIC_LIFF_ID})
                    .then(() => {
                        const idToken = liff.getDecodedIDToken();
                        setToken(idToken);
                        setSendMessage(liff.sendMessages);
                    })
                    .catch((err) => {
                        alert(`LIFFの初期化失敗。\n${err}`);
                });
                if (!liff.isLoggedIn()) {
                    liff.login();
                };
            };

            initLiff();
        },
        [setToken, setLiffSendMessage],
    );

    return { token, liffSendMessage };
}