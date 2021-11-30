import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useLineQRCode } from '../hooks/useLineQRCode'

export default function Home() {
  const { inputRef } = useLineQRCode({
    options: {
      level: 'H',
      margin: 2,
      scale: 2,
      width: 240,
    },
  });
  console.log(inputRef);

  return (
    <>
    <section className="app-wrapper">
      <div className="member-card-app">
        <div className="header">
          <p>ユーザー名：{inputRef.current.userInfo ? inputRef.current.userInfo.name : ""}</p>
          <p>ユーザーID：{inputRef.current.userInfo ? inputRef.current.userInfo.id : ""}</p>
          <img
            ref={inputRef}
          />
        </div>
      </div>
    </section>
    </>
  )
};
