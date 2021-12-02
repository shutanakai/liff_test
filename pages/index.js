import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { memo, useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { flexMessages } from '../utils/flexMessage';

export default memo(function Home() {
    const [token, setToken] = useState(null);
    const message = flexMessages;

    useEffect(() => {
        const initLiff = async () => {
            const liff = (await import('@line/liff')).default;
            await liff
                .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
                .then(() => {
                    const idToken = liff.getDecodedIDToken();
                    setToken(idToken);
                })
                .catch((err) => {
                    alert(`LIFFの初期化失敗。\n${err}`);
                });
            if (!liff.isLoggedIn()) {
                liff.login();
            }
            return liff;
        };

        initLiff();
    }, [setToken]);

    const sendMessages = async (messages) => {
        const liff = (await import('@line/liff')).default;
        await liff
            .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
            .then(() => {
                liff.sendMessages(messages);
                liff.closeWindow();
            })
            .catch((err) => {
                alert(`メッセージ送信失敗\n${err}`);
            });
    };

    return (
        <>
            <section className="app-wrapper">
                <div className="member-card-app">
                    <div>
                        <p>ユーザー名：{token ? token.name : '取得できませんでした'}</p>
                        <p>ユーザーID：{token ? token.sub : '取得できませんでした'}</p>
                        {token ? <QRCode value={token.sub} /> : <p>tokenがありません</p>}
                        <button onClick={() => sendMessages(message)}>メッセージ送信</button>
                    </div>
                </div>
            </section>
        </>
    );
});
