import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useLiffLogin } from '../hooks/useLiffLogin'

export default function Home() {
  const liff = useLiffLogin();
  const initialInfo = {
    name: '',
    id: '',
  };
  const [userInfo, setUserInfo] = useState(initialInfo);
  const getUserInfo = () => {
    if(!liff.isLoggedIn()) {
      liff.login({});
    } else {
      liff.getProfile()
        .then((profile) => {
          const {displayName, userId} = profile;
          setUserInfo({name: displayName, id: userId});
        }).catch((error) => console.log(error));
    }
  }

  return (
    <>
    <Script charset="utf-8" src="https://static.line-scdn.net/liff/edge/2/sdk.js"></Script>
    <section className="app-wrapper">
      <div className="member-card-app">
        <div className="header">
          <button onClick={getUserInfo}>ユーザー情報の取得</button>
          <p>ユーザー名：{userInfo.name}</p>
          <p>ユーザーID：{userInfo.id}</p>
        </div>
      </div>
    </section>
    </>
  )
}
