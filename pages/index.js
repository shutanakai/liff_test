import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useLineQRCode } from '../hooks/useLineQRCode'
import { memo } from 'react';

export default memo(function Home() {
  const { userInfo, inputRef } = useLineQRCode({
    options: {
      level: 'H',
      margin: 2,
      scale: 2,
      width: 240,
    },
  });

  return (
    <>
    <section className="app-wrapper">
      <div className="member-card-app">
        <div className="header">
          <p>ユーザー名：{userInfo ? userInfo.name : ""}</p>
          <p>ユーザーID：{userInfo ? userInfo.id : ""}</p>
          <img
            ref={inputRef}
          />
        </div>
      </div>
    </section>
    </>
  )
});
