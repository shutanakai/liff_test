import React, { useState } from 'react';
const QRCode = require('qrcode');

export const useLineQRCode = ({...props}) => {
    const inputRef = React.useRef(null);
    const { options } = props;
    const [userInfo, setUserInfo] = useState({name: 'テスト', id: '12345'});

    React.useEffect(
        () => {
            const getUserInfo = async () => {
                let user;
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
                            user = {name: displayName, id: userId};
                            console.log(user);
                        }).catch((error) => {
                            alert(`エラー： ${error}`);
                        });
                };
                return user;
            };
            const initQRCode = async () => {
                if (inputRef && inputRef.current) {
                    if (inputRef.current instanceof HTMLCanvasElement && inputRef.current.userInfo) {
                        const user = await getUserInfo();
                        await QRCode.toCanvas(
                            inputRef.current,
                            user.id,
                            options,
                            function (error) {
                                if (error) {
                                    throw error;
                                }
                            },
                        );
                    } else if (inputRef.current instanceof HTMLImageElement && inputRef.current.userInfo) {
                        await QRCode.toDataURL(
                            user.id,
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
                    setUserInfo(user);
                }
            };
            initQRCode();
        },
        [options, inputRef, userInfo],
    );

    return { userInfo, inputRef };
}