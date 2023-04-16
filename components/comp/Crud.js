import Head from 'next/head'
import {CiTrash} from 'react-icons/ci'
import Image from 'next/image'
import styles from '../comp/Crud.module.css'

import { useState, useRef, useEffect } from 'react'

export default Crud;

function Crud(){
  const nameRef = useRef();
  const cardIdRef = useRef();
  const permissionRef = useRef();
  const deleteIdRef = useRef();
  const updateIdRef = useRef();
  const updateNameRef = useRef();
  const updateCardIdRef = useRef();
  const [employee, setEmployee] = useState([]);
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(false);
  const [deleted, setDelete] = useState(false);


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

  async function getEmployee(){
    const getEmpdata = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch('http://localhost:3000/api/crud', 
    getEmpdata
    );
    const response = await res.json();
    setEmployee(response.employee);
  }

  async function updateEmployee(){
    const updateEmployeeId = updateIdRef.current.value;
    const updateEmployeeName = updateNameRef.current.value;
    const updateEmployeeCardId = updateCardIdRef.current.value;
    
    if(!updateEmployeeId.length) return; // if nothing in the field, do nothing
    const putEmpdata = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID: updateEmployeeId,
        Name: updateEmployeeName,   
        cardUID: updateEmployeeCardId, 
      })
    };
    const res = await fetch('http://localhost:3000/api/crud', 
    putEmpdata
    );
    const response = await res.json();

    if(response.response.message != "success") return;

    const IdUpdated = parseFloat(response.response.employee.ID);
    const employeeUpdatedName = response.response.employee.Name;
    const employeeUpdatedEmpCardId = response.response.employee.cardUID;
    //update state
    const datasStateAfterUpdate = employee.map((employee) => {
      if(employee.ID === IdUpdated ){
        const employeeUpdated = {
          ...employee,
          Name: employeeUpdatedName,
          cardUID: employeeUpdatedEmpCardId,
        };
        return employeeUpdated;
      } else {
        return {
          ...employee,
        };
      }
    });
    setUpdate(true);
    setEmployee(datasStateAfterUpdate);
  }

  async function deleteEmployee(id){
    if(!id) return;
    const deleteEmpdata = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID: id,
      })
    };
    const res = await fetch('http://localhost:3000/api/crud', 
    deleteEmpdata
    );
    const response = await res.json();
    if(response.response.message !== "success") return;
    setDelete(true);
    const removeId = parseFloat(response.response.ID);
    setEmployee(employee.filter((d) => d.ID !== removeId));
  }

  useEffect(() => {
    getEmployee();
  }, []);

  return(
    <>
    <div className={styles.container}>
        <div className={styles.main}>
          <h1>CRUD Operations</h1>
        </div>
        <section>
          <div className={styles.read}>
            <h2>Employee Information</h2>
            <div className={styles.list}>
              {employee.map((item, index) => {
                return(
                  <div key={item.ID} className={styles.empList}>
                    <span> Employee ID: </span> {item.ID} |
                    <span> Name: </span>{item.Name} |
                    <span> Card ID: </span>{item.cardUID} |
                    <span> Access: </span>{item.permission}
                    <span> </span><span> </span>
                    <CiTrash className = {styles.icon} 
                      onClick = {() => deleteEmployee(item.ID)}
                    />
                  </div>
                );
              })}
              {!employee.length ? <>No Products found</> : null}
            </div>
          </div>
        </section>
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
           {create ? <div className={styles.success}>Success!</div> : null}
          </div>
        </section>
        <section>
          <div className={styles.update}>
            <h2>Update</h2>
            <div className={styles.input}>
              <h3>Choose ID:</h3>
              <input className = {styles.label} type='text' ref={updateIdRef}/>
              <h3>Employee Name:</h3>
              <input className = {styles.label} type='text' ref={updateNameRef}/>
              <h3>Card ID:</h3>
              <input className = {styles.label} type='text' ref={updateCardIdRef}/>
            </div>
            <div>
              <input
                className={styles.button}
                value='Update'
                type='button'
                onClick={updateEmployee}
              />
           </div>
           {update ? <div className={styles.success}>Success!</div> : null}
          </div>
        </section>
        <section>
          <div className={styles.delete}>
            <h2>Delete</h2>
            <div className={styles.input}>
              <h3>ID to Delete:</h3>
              <input className = {styles.label} type='text' ref={deleteIdRef}/>
            </div>
            <div>
              <input
                className={styles.buttonDel}
                value='Delete'
                type='button'
                onClick={() => deleteEmployee(deleteIdRef.current.value)}
              />
           </div>
           {deleted ? <div className={styles.success}>Success!</div> : null}
          </div>
        </section>
    </div>
    </>
  )

}