import Head from 'next/head'
import {CiTrash} from 'react-icons/ci'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import Crud from '../components/comp/Crud'
import Login from '../components/comp/Login'

import { useState, useRef, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

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
