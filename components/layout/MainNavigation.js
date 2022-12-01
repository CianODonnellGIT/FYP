import classes from './MainNavigation.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link'

function MainNavigation() {

  const router = useRouter();

  function showEmployee() {
   // window.location = '/api/employee' 
    router.push('/api/employee')
  }


  return (
    <section>
    <header className={classes.header}>
      <div className={classes.logo}>Home</div>
      <nav>
        <ul>
          <li>
            <Link href='/new-meetup'>Add New Employee</Link>
          </li>
          <li>
            <Link href='/'>Logout</Link>
          </li>
        </ul>
      </nav>
    </header>

    <div className= {classes.database}>
      <button className= {classes.database} onClick={() => showEmployee()}>Database</button>
      <button className= {classes.database} >Clock I/O</button>
      <button className= {classes.database} >Etc</button>
      <button className= {classes.database} >Etc</button>
    </div>

   

    </section>
  );
}

export default MainNavigation;
