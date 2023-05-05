/*
This code was inspired by the following reference
    GitHub, "olbega/nextjs-crud-mysql" [Online]. Available: https://github.com/oelbaga/nextjs-crud-mysql.
*/
import styles from '../comp/EditEmployee.module.css'

import { useState, useRef, useEffect } from 'react'

export default EditEmp;

function EditEmp() {

  const updateIdRef = useRef();
  const updateNameRef = useRef();
  const updateCardIdRef = useRef();
  const updateRoleRef = useRef();
  const [employee, setEmployee] = useState([]);
  const [update, setUpdate] = useState(false);


  async function updateEmployee() {
    const updateEmployeeId = updateIdRef.current.value;
    const updateEmployeeName = updateNameRef.current.value;
    const updateEmployeeCardId = updateCardIdRef.current.value;
    const updateEmployeeRole = updateRoleRef.current.value;

    if (!updateEmployeeId.length) return; // if nothing in the field, do nothing
    const putEmpdata = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID: updateEmployeeId,
        Name: updateEmployeeName,
        cardUID: updateEmployeeCardId,
        Role: updateEmployeeRole,
      })
    };
    const res = await fetch('https://main.dshngqz5l8v9y.amplifyapp.com/api/crud',
      putEmpdata
    );
    const response = await res.json();

    if (response.response.message != "success") return;

    const IdUpdated = parseFloat(response.response.employee.ID);
    const employeeUpdatedName = response.response.employee.Name;
    const employeeUpdatedEmpCardId = response.response.employee.cardUID;
    const employeeUpdatedRole = response.response.employee.Role;

    //update state
    const datasStateAfterUpdate = employee.map((employee) => {
      if (employee.ID === IdUpdated) {
        const employeeUpdated = {
          ...employee,
          Name: employeeUpdatedName,
          cardUID: employeeUpdatedEmpCardId,
          Role: employeeUpdatedRole,
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

  return (
    <>
      <div className={styles.container}>
        <section>
          <div className={styles.update}>
            <h2>Edit Employee Information</h2>
            <div className={styles.input}>
              <h3>Choose ID:</h3>
              <input className={styles.label} type='text' ref={updateIdRef} />
              <h3>Employee Name:</h3>
              <input className={styles.label} type='text' ref={updateNameRef} />
              <h3>Role:</h3>
              <input className={styles.label} type='text' ref={updateRoleRef} />
              <h3>Card ID:</h3>
              <input className={styles.label} type='text' ref={updateCardIdRef} />
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
      </div>
    </>
  )
}

