import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useLineQRCode } from '../hooks/useLineQRCode'
import { memo } from 'react';

export default memo(function Home() {
  const { token, inputRef } = useLineQRCode();

  return (
    <>
    <section className="app-wrapper">
      <div className="member-card-app">
        <div className="header">
          <p>ユーザー名：{token ? token.name : "取得できませんでした"}</p>
          <p>ユーザーID：{token ? token.sub : "取得できませんでした"}</p>
          {token && (
              <img
                ref={inputRef}
                alt={token ? token.sub : ""}
              />
          )}
        </div>
      </div>
    </section>
    </>
  )
});
