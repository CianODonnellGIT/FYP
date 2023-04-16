import styles from '../comp/AddEmp.module.css'

import { useState, useRef, useEffect } from 'react'



export default AddEmp;


function AddEmp(){

    const nameRef = useRef();
    const cardIdRef = useRef();
    const permissionRef = useRef();

    const [employee, setEmployee] = useState([]);
    const [create, setCreate] = useState(false);


    async function addEmployee() {
        const employeeName = nameRef.current.value.trim();   //trim removes any white space at beginning & end    
        const employeeCardId = cardIdRef.current.value.trim();
        const empPermission = permissionRef.current.value.trim();
        const postEmpdata = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: employeeName,   //Name is name of column in sql database
            cardUID: employeeCardId,
            permission: empPermission,
          }),
        };
        const res = await fetch('http://localhost:3000/api/crud',
        postEmpdata
        );
        const response = await res.json();
        if(response.response.message != "success") return;
    
        const newEmployee = response.response.employee;
        setEmployee([   //update data right away
          ...employee,
          {
            ID: newEmployee.ID,
            Name: newEmployee.Name,
            cardUID: newEmployee.cardUID,
          },
        ]);
        setCreate(true);
      }


      return(
        <>
        <div className={styles.container}>
        <section>
          <div className={styles.create}>
            <h2>Add New Employee</h2>
            <div className={styles.input}>
              <h3>Name:</h3>
              <input className = {styles.label} type='text' ref={nameRef} />
              <h3>Card ID:</h3>
              <input className = {styles.label} type='text' ref={cardIdRef}/>
              <h3>Card Permission:</h3>
              <select className={styles.label} type='text'  ref={permissionRef}>
                <option></option>
                <option>Accepted</option>
                <option>Denied</option>
              </select>
            </div>
            <div>
              <input
                className={styles.button}
                value='Save'
                type='button'
                onClick={addEmployee}
              />
           </div>
           {create ? <div  className={styles.success}>Success!</div> : null}
          </div>
        </section>
        </div>
        </>
      )

}