import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Login from '../components/comp/Login'



export default function Home() {
  
  return (
    <>
    <div className = {styles.container}>
      <Head>
        <title>Employee Logs</title>
        <link rel="icon" href="/Logo1.png" sizes='1002x1000' />
      </Head>
      <Login/>
      </div>
    </>
  )
}
