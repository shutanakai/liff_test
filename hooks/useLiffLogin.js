import { useEffect, useState } from 'react'

export const useLiffLogin = () => {
    const initialInfo = {
        name: '',
        id: '',
      };
      const [userInfo, setUserInfo] = useState(initialInfo);

    useEffect(() => {
        let unmounted = false;
        const initLiff = async () => {
            const liff = (await import('@line/liff')).default;
            await liff.init({liffId: process.env.NEXT_PUBLIC_LIFF_ID})
                .catch((err) => {
                    alert(`LIFFの初期化失敗。\n${err}`);
            });
            if (!liff.isLoggedIn()) {
                liff.login();
            } else {
                liff.getProfile()
                    .then((profile) => {
                        const {displayName, userId} = profile;
                        setUserInfo({name: displayName, id: userId});
                    }).catch((error) => {
                        alert(`エラー： ${error}`);
                    });
            };
            if (!unmounted) {
                setLiff(liff);
            };
        };
        const cleanUp = () => {
            unmounted = true;
        }

        initLiff();
        return cleanUp;
    }, []);

    return userInfo;

}
