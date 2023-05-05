import { useState } from "react";
import DoorAccessLog from "../comp/DoorAccessLog";
import AddEmp from "../comp/AddEmp";
import EditEmp from "../comp/EditEmployee";
import EmpList from "../comp/EmployeeList";
import styles from './MainNav.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link'



function MainNavigation() {


  const router = useRouter();

   const [showTable, setShowTable] = useState(false);
   const [showEmpList, setEmpList] = useState(false);
   const [showAddEmp, setAddEmp] = useState(false);
   const [showEditEmp, setEditEmp] = useState(false);
   
   const showTableHandle = () => {
    setShowTable(!showTable);
    setEmpList(false);
    setAddEmp(false);
    setEditEmp(false);
   }

   const empListHandle = () => {
    setEmpList(!showEmpList);
    setShowTable(false);
    setAddEmp(false);
    setEditEmp(false);
   }

   const addEmpHandle = () => {
    setAddEmp(!showAddEmp);
    setShowTable(false);
    setEmpList(false);
    setEditEmp(false);
   }

   const editEmpHandle = () => {
    setEditEmp(!showEditEmp);
    setAddEmp(false);
    setShowTable(false);
    setEmpList(false);
   }
  

  function goHome(){
    router.push('/main')
    setShowTable(false);
    setEmpList(false);
    setAddEmp(false);
    setEditEmp(false);
  }



  return (
    <>
    <section className={styles.container}>

    <header className={styles.header}>
      <div className={styles.logo} onClick = {() => goHome()} >Scan & Go Systems</div>
      <nav>
        <ul>
          <li>
            <Link href='/api/auth/logout'>Logout</Link>
          </li>
        </ul>
      </nav>
    </header>

    <div className= {styles.selection}>
      <button className= {styles.database} onClick={showTableHandle}>Door Logs</button>
      <div>{showTable && <DoorAccessLog />}</div>
      <button className= {styles.database} onClick={empListHandle} >Employee List</button>
      <div>{showEmpList && <EmpList />}</div>
      <button className= {styles.database} onClick={addEmpHandle} >Add Employee</button>
      <div>{showAddEmp && <AddEmp />}</div>
      <button className= {styles.database} onClick={editEmpHandle} >Edit Employee</button>
      <div>{showEditEmp && <EditEmp />}</div>
    </div>
    <section>
        <footer className={styles.footer}>
          <p>Scan & Go </p>
          <t> Final Year Project </t>
          <t>Cian O'Donnell</t>
          <t>G00358872</t>
          <p1>
          <a
            href = "https://github.com/CianODonnellGIT/FYP"
          >Github Repository</a>
          </p1>
        </footer>
        </section>
    </section>
  </>
  );
}

export default MainNavigation;
