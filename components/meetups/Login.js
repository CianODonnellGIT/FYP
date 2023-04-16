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
      router.push('/home')
    }
  }
  return (
    <>

<main className={cn(styles["form-signin"],"text-center","mt-5")}>
        <form>
          <h1 className="h3 mb-3 fw-normal">Sign In</h1>

          <div className="form-floating">
            <input className="form-control" id="username" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="password" placeholder="Password" />
            <label >Password</label>
          </div>

          <div className={cn(styles.checkbox,"mb-3")}>
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
           {/* <Link href='/home'>Log in</Link> */}
          <h3 className="w-100 btn btn-lg btn-primary" type="submit"
          onClick ={()=> validation()}>Sign in</h3>
        </form>
      </main>
    </>
  )
}