import {CiTrash} from 'react-icons/ci'
import styles from '../comp/EmployeeList.module.css'

import { useState, useRef, useEffect } from 'react'

export default EmpList;

function EmpList(){
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
      </div>
    </>
  )

}