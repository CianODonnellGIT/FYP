import Link from 'next/link'
import styles from '../styles/login.module.css'
import cn from 'classnames'
export default Login;

function Login() {
  return (
    <>

<main className={cn(styles["form-signin"],"text-center","mt-5")}>
        <form>
          <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className={cn(styles.checkbox,"mb-3")}>
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
            <Link href='/home'>Log in</Link>
          <button href='/api' className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
      </main>
    </>
  )
}