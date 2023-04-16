import Link from 'next/link'
import styles from './Login.module.css'
import cn from 'classnames'
import { useState } from 'react'
import { useRouter } from 'next/router';

export default Login;

function Login() {
 
  const router = useRouter();
  
  function validation() {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    if(username == 'g00358872@atu.ie' && password == 'cian' ){
      router.push('/main')
    }
  }
  return (
    <>
    
      <div className = {styles.container}>
        <div className={styles.main}>
          <h1 className={styles.head}>Employee Logs</h1>
          <h3>Sign In</h3>
          <div className={styles.formfloating}>  
            <input className = {styles.input} id="username" placeholder="email@example.com" />
          </div>
          <div className={styles.formfloating}>
            <input type="password" className = {styles.input} id="password" placeholder="Password" />
          </div>
          <div className={styles.checkbox}>
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
            {/* <Link href='/home'>Log in</Link> */}
              <input
                className={styles.button}
                value='Sign In'
                type='button'
                onClick ={()=> validation()}/>
        </div>
      </div>
    </>
  )
}