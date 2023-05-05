/*
This code was inspired by the following reference
    GitHub, "auth0/nextjs-auth0: Next.js SDK for signing in with Auth0" [Online]. Available: https://github.com/auth0/nextjs-auth0.
*/
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from './Login.module.css'
import Link from 'next/link'


export default function Login() {
  const { user, error, isLoading } = useUser();


  if (isLoading)
    return <div className={styles.head}>....Loading</div>

  if (error)
    return <div className={styles.head}>{error.message}</div>

  if (user) {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.main}>
            <h1 className={styles.head}>Welcome</h1>
            <h3 className={styles.success}>Sign in successful</h3>
            <nav>
              <ul>
                <Link className={styles.button} href='/main'>Continue to Main</Link>  
              </ul>
            </nav>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.head}>Employee Logs</h1>
          <h3>Sign In</h3>
          <nav>
            <ul>            
              <Link className={styles.button} href='/api/auth/login'>Login</Link>             
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}