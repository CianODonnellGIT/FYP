import classes from './MainNavigation.module.css';
import Link from 'next/link'

function MainNavigation() {

  return (
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
  );
}

export default MainNavigation;
