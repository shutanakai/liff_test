import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const VConsole = dynamic(() => {
    import('vconsole'), { ssr: false}
});

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
                return liff;
            };

            new VConsole();

            const liff = initLiff();
            setLiff(liff);
        },
        [setToken, setLiffSendMessage, setLiff],
    );

    return { token, liffSendMessage, liff };
}