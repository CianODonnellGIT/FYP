import Login from '../meetups/Login'
import classes from './Layout.module.css';
import MainNavigation from './MainNavigation';

function Layout(props) {
  return (
    <div>
      <main className={classes.main}>{props.children}</main>
      <Login/>
    </div>

   
  );
}

export default Layout;
