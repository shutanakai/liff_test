import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useQRCode } from 'next-qrcode'
import { useLiffLogin } from '../hooks/useLiffLogin'

export default function Home() {
  const liff = useLiffLogin();
  const initialInfo = {
    name: '',
    id: '',
  };
  const [userInfo, setUserInfo] = useState(initialInfo);
  const { inputRef } = useQRCode({
    text: "https://www.google.com/?hl=ja",
    options: {
      level: 'H',
      margin: 2,
      scale: 2,
      width: 240,
    },
  });
  useEffect(() => {
    const getUserInfo = async () => {
      await liff.getProfile()
        .then((profile) => {
          const {displayName, userId} = profile;
          setUserInfo({name: displayName, id: userId});
        }).catch((error) => alert(`エラー： ${error}`));
    };
    getUserInfo();
  }, [liff]);


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
