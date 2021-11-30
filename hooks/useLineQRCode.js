import React, { useState } from 'react';
const QRCode = require('qrcode');

export const useLineQRCode = ({...props}) => {
    const inputRef = React.useRef(null);
    const { options } = props;
    const [userInfo, setUserInfo] = useState({name: '', id: ''});

    React.useEffect(
        () => {
            const getUserInfo = async () => {
                let userInfo;
                const liff = (await import('@line/liff')).default;
                await liff.init({liffId: process.env.NEXT_PUBLIC_LIFF_ID})
                    .catch((err) => {
                        alert(`LIFFの初期化失敗。\n${err}`);
                });
                if (!liff.isLoggedIn()) {
                    liff.login();
                } else {
                    await liff.getProfile()
                        .then((profile) => {
                            const {displayName, userId} = profile;
                            userInfo = {name: displayName, id: userId};
                        }).catch((error) => {
                            alert(`エラー： ${error}`);
                        });
                };
                return userInfo;
            };
            const initQRCode = async () => {
                if (inputRef && inputRef.current) {
                    if (inputRef.current instanceof HTMLCanvasElement && inputRef.current.userInfo) {
                        const userInfo = await getUserInfo();
                        await QRCode.toCanvas(
                            inputRef.current,
                            userInfo.id,
                            options,
                            function (error) {
                                if (error) {
                                    throw error;
                                }
                            },
                        );
                    } else if (inputRef.current instanceof HTMLImageElement && inputRef.current.userInfo) {
                        await QRCode.toDataURL(
                            userInfo.id,
                            options,
                            function (error, url) {
                                if (error) {
                                    throw error;
                                }
                                if (inputRef.current instanceof HTMLImageElement) {
                                    inputRef.current.src = url;
                                }
                        });
                    }
                    setUserInfo(userInfo);
                }
            };
            initQRCode();
        },
        [options, inputRef, userInfo],
    );

    return { userInfo, inputRef };
}