import React, { useEffect, useState } from 'react'

export const useLiffLogin = () => {

    const [liff, setLiff] = useState();
    const [clientAlert, setClientAlert] = useState(undefined);

    useEffect(() => {
        let unmounted = false;
        const getUserInfo = async () => {
            const liff = (await import('@line/liff')).default;
            await liff.init({liffId: process.env.NEXT_PUBLIC_LIFF_ID});
            liff.init({
            liffId: process.env.NEXT_PUBLIC_LIFF_ID,
            });
            if (!unmounted) {
                setLiff(liff);
            }
        };
        const cleanUp = () => {
            unmounted = true;
        }

        const { alert } = window;
        setClientAlert(alert);

        getUserInfo();
        return cleanUp;
    }, [clientAlert]);

    return liff;

}
