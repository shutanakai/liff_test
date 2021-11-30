import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useLineQRCode } from '../hooks/useLineQRCode'

export default function Home() {
  const { userInfoRef, inputRef } = useLineQRCode({
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
          <p>ユーザー名：{userInfoRef.current ? userInfoRef.current.name : 'undifined'}</p>
          <p>ユーザーID：{userInfoRef.current ? userInfoRef.current.id : 'undifined'}</p>
          <img
            ref={inputRef}
          />
        </div>
      </div>
    </section>
    </>
  )
};
