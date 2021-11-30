import React from 'react';
const QRCode = require('qrcode');

export const useLineQRCode = ({...props}) => {
    const inputRef = React.useRef(null);
    const { options } = props;

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
                    inputRef.current.userInfo = await getUserInfo();
                    if (inputRef.current instanceof HTMLCanvasElement && inputRef.current.userInfo) {
                        await QRCode.toCanvas(
                            inputRef.current,
                            inputRef.current.userInfo.id,
                            options,
                            function (error) {
                                if (error) {
                                    throw error;
                                }
                            },
                        );
                    } else if (inputRef.current instanceof HTMLImageElement && inputRef.current.userInfo) {
                        await QRCode.toDataURL(
                            inputRef.current.userInfo.id,
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
                }
            };
            initQRCode();
        },
        [options, inputRef],
    );

    return { inputRef };
}