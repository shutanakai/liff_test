import React, { useEffect, useRef, useState } from 'react';
const QRCode = require('qrcode');

export const useLineQRCode = () => {
    const inputRef = useRef(null);
    const [userInfo, setUserInfo] = useState({name: 'テスト', id: '12345'});
    const [token, setToken] = useState({});

    useEffect(
        () => {
            const options = {
                type: 'image/jpeg',
                quality: 0.3,
                level: 'H',
                margin: 2,
                scale: 2,
                width: 240,
            };
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
                    const idToken = await liff.getDecodedIDToken();
                    await setToken(idToken);
                };
                return user;
            };
            const initQRCode = async () => {
                if (inputRef && inputRef.current) {
                    const { user } = await getUserInfo();
                    if (inputRef.current instanceof HTMLCanvasElement && user) {
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
                    } else if (inputRef.current instanceof HTMLImageElement && user) {
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
                    await setUserInfo(user);
                }
            };
            initQRCode();
        },
        [setUserInfo, setToken],
    );

    return { userInfo, token, inputRef };
}