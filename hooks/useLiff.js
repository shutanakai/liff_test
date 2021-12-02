import { useEffect, useState } from 'react';

export const useLiff = () => {
    const [token, setToken] = useState(null);
    const [liff, setLiff] = useState(null);

    useEffect(
        () => {
            const initLiff = async () => {
                const liff = (await import('@line/liff')).default;
                await liff.init({liffId: process.env.NEXT_PUBLIC_LIFF_ID})
                    .then(() => {
                        const idToken = liff.getDecodedIDToken();
                        setToken(idToken);
                    })
                    .catch((err) => {
                        alert(`LIFFの初期化失敗。\n${err}`);
                });
                if (!liff.isLoggedIn()) {
                    liff.login();
                };
                return liff;
            };

            const liff = initLiff();
            setLiff(liff);
        },
        [setToken, setLiff],
    );

    return { token, liff };
}