import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useLiffLogin } from '../hooks/useLiffLogin'
import { useQRCode } from '../hooks/useQRCode'

export default function Home() {
  const userInfo = useLiffLogin();
  const [qrSrc, setQrSrc] = useState(null);
  const { inputRef } = useQRCode({
    text: qrSrc,
    options: {
      level: 'H',
      margin: 2,
      scale: 2,
      width: 240,
    },
  });

  useEffect(() => {
    setQrSrc(userInfo.id);
  }, [userInfo]);

  return (
    <>
    <section className="app-wrapper">
      <div className="member-card-app">
        <div className="header">
          <p>ユーザー名：{userInfo.name}</p>
          <p>ユーザーID：{userInfo.id}</p>
          <canvas ref={inputRef} />
        </div>
      </div>
    </section>
    </>
  )
};
