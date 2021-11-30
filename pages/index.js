import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useLineQRCode } from '../hooks/useLineQRCode'

export default function Home() {
  const { userInfo, inputRef } = useLineQRCode({
    options: {
      type: 'image/jpeg',
      quality: 0.3,
      level: 'M',
      margin: 3,
      scale: 4,
      width: 200,
      color: {
        dark: '#010599FF',
        light: '#FFBF60FF',
      },
    },
  });

  return (
    <>
    <section className="app-wrapper">
      <div className="member-card-app">
        <div className="header">
          <p>ユーザー名：{userInfo.name}</p>
          <p>ユーザーID：{userInfo.id}</p>
          <Image ref={inputRef} alt={userInfo.id} />
        </div>
      </div>
    </section>
    </>
  )
};
