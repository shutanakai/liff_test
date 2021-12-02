import React, { useEffect, useRef, useState } from 'react';
const QRCode = require('qrcode');

export const useLineQRCode = () => {
    const inputRef = useRef(null);
    const [token, setToken] = useState(null);

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
            const initQRCode = async (token) => {
                if (inputRef && inputRef.current) {
                    if (inputRef.current instanceof HTMLCanvasElement && user) {
                        await QRCode.toCanvas(
                            inputRef.current,
                            token.sub,
                            options,
                            function (error) {
                                if (error) {
                                    throw error;
                                }
                            },
                        );
                    } else if (inputRef.current instanceof HTMLImageElement && user) {
                        await QRCode.toDataURL(
                            token.sub,
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
            const idToken = getToken();
            if (idToken) {
                initQRCode(idToken);
            }
        },
        [setToken],
    );

    return { token, inputRef };
}