import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useLiffToken } from '../hooks/useLiffToken'
import { memo } from 'react'
import QRCode from "qrcode.react"

export default memo(function Home() {
  const { token } = useLiffToken();

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
        </div>
      </div>
    </section>
    </>
  )
});
