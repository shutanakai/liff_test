import { useEffect, useRef, useState } from 'react';

export const useLiffToken = () => {
    const [token, setToken] = useState(null);

    useEffect(
        () => {
            const getToken = async () => {
                let token;
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
                return token;
            };

            getToken();
        },
        [setToken],
    );

    return { token };
}