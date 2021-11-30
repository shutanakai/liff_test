import React from 'react';
const QRCode = require('qrcode');
import { useLiffLogin } from './useLiffLogin'

export const useQRCode = ({...props}) => {
    const inputRef = React.useRef(null);
    const { options } = props;
    const userInfo = useLiffLogin();

    React.useEffect(
        () => {
            const initQRCode = async () => {
                if (inputRef && inputRef.current) {
                    if (inputRef.current instanceof HTMLCanvasElement) {
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
                    } else if (inputRef.current instanceof HTMLImageElement) {
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
                }
            };
            initQRCode();
        },
        [userInfo, options, inputRef],
    );

    return { userInfo, inputRef };
}