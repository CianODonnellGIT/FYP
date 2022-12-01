import classes from './MeetupDetail.module.css'
import { useRouter } from 'next/router';
import Link from 'next/link'

function MeetupDetail(props) {

    const router = useRouter();

    function showDetailsHandler() {
        router.push('/home');
      }
   
    return (
        <section className={classes.detail}>
        <h1>{props.title}</h1>
          
       
        <div className={classes.block}>   
            <img src={props.image} alt={props.title} />
                <div className={classes.content}>
                <div className={classes.block2}>
                <p>{props.description}</p>
                <div className={classes.block4}>
                <p3>{props.descriptiondetail}</p3>
                </div>
                </div>
                <div className={classes.block3}>
                <address>{props.address}</address>
                <address>{props.address2}</address>
                <address>{props.address3}</address>
                <address>{props.address4}</address>
                </div>
                </div>
            </div>  

            <div classname={classes.home}>
             <div className={classes.actions}>
             <button onClick={showDetailsHandler}>Home Page</button>
             </div>
             <div className={classes.link}>
             <nav>
                 <li>
                     <Link href='/'>Home Page</Link>
                 </li>
                </nav>
             </div>
             </div>
        </section>

    )
}

export default MeetupDetail