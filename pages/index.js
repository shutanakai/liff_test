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
  const inputRef = useQRCode({
    text: userInfo.id,
    options: {
      type: 'image/png',
      level: 'H',
      margin: 2,
      scale: 2,
      width: 240,
    }
  });
  useEffect(() => {
    const getUserInfo = () => {
      liff.getProfile()
        .then((profile) => {
          const {displayName, userId} = profile;
          setUserInfo({name: displayName, id: userId});
        })
        .catch((error) => alert(`エラー： ${error}`));
    };
    getUserInfo();
  }, [liff]);


  return (
    <>
    <section className="app-wrapper">
      <div className="member-card-app">
        <div className="header">
          <p>{userInfo.name} さん</p>
          <Image ref={inputRef} alt="" />
        </div>
      </div>
    </section>
    </>
  )
};
