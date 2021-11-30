import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useLineQRCode } from '../hooks/useLineQRCode'
import { memo } from 'react';

export default memo(function Home() {
  const { userInfo, inputRef } = useLineQRCode();

  return (
    <>
    <section className="app-wrapper">
      <div className="member-card-app">
        <div className="header">
          <p>ユーザー名：{userInfo ? userInfo.name : ""}</p>
          <p>ユーザーID：{userInfo ? userInfo.id : ""}</p>
          <Image
            ref={inputRef}
            alt={userInfo ? userInfo.id : ""}
          />
        </div>
      </div>
    </section>
    </>
  )
});
