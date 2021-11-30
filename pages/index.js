import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useLineQRCode } from '../hooks/useLineQRCode'

export default function Home() {
  const { userInfo, inputRef } = useLineQRCode({
    options: {
      type: 'image/jpeg',
      quality: 0.3,
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
          <Image
            ref={inputRef}
            alt={userInfo.id}
          />
        </div>
      </div>
    </section>
    </>
  )
};
