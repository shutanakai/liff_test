import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useLiffToken } from '../hooks/useLiffToken'
import { memo, useState } from 'react'
import QRCode from "qrcode.react"

export default memo(function Home() {
  const { token, liff } = useLiffToken();
  const [status, setStatus] = useState(false);
  const message = {
    type: 'text',
    text: 'Hello, World!'
  };

  const sendMessages = (message) => {
    liff.sendMessages(message).then(() => {
      console.log("success");
    }).catch((err) => {
      setStatus(true);
      console.log(err);
    });
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
            <p>sendMessages失敗</p>
          )}
        </div>
      </div>
    </section>
    </>
  )
});
