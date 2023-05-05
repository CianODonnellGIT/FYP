/*
This code was inspired by the following reference
    GitHub, "olbega/nextjs-crud-mysql" [Online]. Available: https://github.com/oelbaga/nextjs-crud-mysql.
*/
import { CiTrash } from 'react-icons/ci'
import styles from '../comp/EmployeeList.module.css'
import { useState, useEffect } from 'react'

export default EmpList;

function EmpList() {

  const [employee, setEmployee] = useState([]);
  const [deleted, setDelete] = useState(false);

  async function getEmployee() {
    const getEmpdata = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch('https://main.dshngqz5l8v9y.amplifyapp.com/api/crud',
      getEmpdata
    );
    const response = await res.json();
    setEmployee(response.employee);
  }

  async function deleteEmployee(id) {
    if (!id) return;
    const deleteEmpdata = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID: id,
      })
    };
    const res = await fetch('https://main.dshngqz5l8v9y.amplifyapp.com/api/crud',
      deleteEmpdata
    );
    const response = await res.json();
    if (response.response.message !== "success") return;
    setDelete(true);
    const removeId = parseFloat(response.response.ID);
    setEmployee(employee.filter((d) => d.ID !== removeId));
  }

  useEffect(() => {
    getEmployee();
  }, []);



  return (
    <>
      <div className={styles.container}>
        <section>
          <div className={styles.read}>
            <h2>Employee Information</h2>
            <div className={styles.list}>
              {employee.map((item, index) => {
                return (
                  <div key={item.ID} className={styles.empList}>
                    <span> Employee ID: </span> {item.ID} |
                    <span> Name: </span>{item.Name} |
                    <span> Role: </span>{item.Role} |
                    <span> Card ID: </span>{item.cardUID} |
                    <span> </span><span> </span>
                    <CiTrash className={styles.icon}
                      onClick={() => deleteEmployee(item.ID)}
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