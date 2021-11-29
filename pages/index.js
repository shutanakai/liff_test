import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useQRCode } from 'next-qrcode'
import { useLiffLogin } from '../hooks/useLiffLogin'

export default function Home() {
  const userInfo = useLiffLogin();
  const { inputRef } = useQRCode({
    text: userInfo.id,
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
          <p>ユーザー名：{userInfo.name}</p>
          <p>ユーザーID：{userInfo.id}</p>
          <canvas ref={inputRef} />
        </div>
      </div>
    </section>
    </>
  )
};
