import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { memo, useState, useEffect } from 'react'
import QRCode from "qrcode.react"


export default memo(function Home() {
  const [status, setStatus] = useState(false);
  const [token, setToken] = useState(null);
  const [liff, setLiff] = useState(null);
  const [err, setErr] = useState("");
  const message = [{
    type: 'text',
    text: 'Hello, World!'
  }];

  useEffect(
      () => {
          const initLiff = async () => {
              const liff = (await import('@line/liff')).default;
              await liff.init({liffId: process.env.NEXT_PUBLIC_LIFF_ID})
                  .then(() => {
                      const idToken = liff.getDecodedIDToken();
                      setToken(idToken);
                      liff.sendMessages([{
                        type: 'text',
                        text: '初期化完了'
                      }]);
                  })
                  .catch((err) => {
                      alert(`LIFFの初期化失敗。\n${err}`);
              });
              if (!liff.isLoggedIn()) {
                  liff.login();
              };
              return liff;
          };

          const liff = initLiff();
          setLiff(liff);
      },
      [setToken],
  );

  const sendMessages = (messages) => {
    if (liff.sendMessages) {
      liff.sendMessages(messages).then(() => {
        setStatus(true);
        setErr("then");
      }).catch((err) => {
        setStatus(true);
        setErr(err.toString());
      });
    } else {
      setStatus(true);
      setErr("liff === null");
    }
  }

  return (
    <>
    <section className="app-wrapper">
      <div className="member-card-app">
        <div className="header">
          <p>ユーザー名：{token ? token.name : "取得できませんでした"}</p>
          <p>ユーザーID：{token ? token.sub : "取得できませんでした"}</p>
          {token ? (
            <QRCode value={token.sub} />
          ) : (
            <p>tokenがありません</p>
          )}
          <button onClick={() => sendMessages(message)}>メッセージ送信</button>
          {status && (
            <div>
              <p>sendMessages失敗</p>
              <p>{err}</p>
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  )
});
