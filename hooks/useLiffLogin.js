import { useEffect, useState } from 'react'

export const useLiffLogin = () => {

    const [liff, setLiff] = useState();

    useEffect(() => {
        let unmounted = false;
        const liffInit = async () => {
            const liff = (await import('@line/liff')).default;
            await liff.init({liffId: process.env.NEXT_PUBLIC_LIFF_ID})
                .catch((err) => {
                    alert(`LIFFの初期化失敗。\n${err}`);
            });
            if (!liff.isLoggedIn()) {
                await liff.login();
            };
            if (!unmounted) {
                setLiff(liff);
            };
        };
        const cleanUp = () => {
            unmounted = true;
        }

        liffInit();
        return cleanUp;
    }, []);

    return liff;

}
