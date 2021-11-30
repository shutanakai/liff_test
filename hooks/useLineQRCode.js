import React, { useRef, useEffect } from 'react';
const QRCode = require('qrcode');

export const useLineQRCode = ({...props}) => {
    const inputRef = useRef(null);
    const userInfoRef = useRef({name: 'テスト', id: '12345'});
    const { options } = props;
    useEffect(
        () => {
            const getUserInfo = async () => {
                let user;
                const liff = (await import('@line/liff')).default;
                if (!liff.id) {
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
                }
                return user;
            };
            const initQRCode = async () => {
                let user;
                if (inputRef && inputRef.current) {
                    user = await getUserInfo();
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
                    userInfoRef.current = user;
                }
            };
            initQRCode();
        },
        [options, inputRef],
    );

    return { userInfoRef, inputRef };
}