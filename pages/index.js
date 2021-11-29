import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import liff from '@line/liff'

export default function Home() {

  const initialInfo = {
    name: '',
    id: '',
  };
  const [userInfo, setUserInfo] = useState(initialInfo);

  const getUserInfo = () => {
    liff.init({
      liffId: process.env.NEXT_PUBLIC_LIFF_ID
    }).then(() => {
      if (!liff.isLoggedIn()) {
        liff.login({})
      } else {
        liff.getProfile()
          .then((profile) => {
            const { userId, displayName } = profile;
            setUserInfo({name: displayName, id: userId});
          }).catch((error) => {
            alert(`Error sending message: ${error}`);
          });
      }
    })
  }

  return (
    <section className="app-wrapper">
      {isLoggedIn && (
        <div className="member-card-app">
          <div className="header">
            <button onClick={getUserInfo}>ユーザー情報の取得</button>
            <p>ユーザー名：{userInfo.name}</p>
            <p>ユーザーID：{userInfo.id}</p>
          </div>
        </div>
      )}
    </section>
  )
}
