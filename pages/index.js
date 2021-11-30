import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useLiffLogin } from '../hooks/useLiffLogin'
import { useBarcode } from 'react-barcodes'

export default function Home() {
  const userInfo = useLiffLogin();
  const { inputRef } = useBarcode({
    value: 'react-barcodes',
    options: {
      background: '#ffff00',
    }
  });

  return (
    <>
    <section className="app-wrapper">
      <div className="member-card-app">
        <div className="header">
          <p>ユーザー名：{userInfo.name}</p>
          <p>ユーザーID：{userInfo.id}</p>
          <img ref={inputRef} />
        </div>
      </div>
    </section>
    </>
  )
};
