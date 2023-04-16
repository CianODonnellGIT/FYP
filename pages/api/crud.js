import {query} from "../../config/db";

export default async function handler(req, res) {
  let message;
  let employee;
  let doorAccess;
  if(req.method === "GET") {    // === comparison operator for strict equality between two values

    const employee = await query({
      query: "SELECT * FROM employees",
      value: [],
    })
    const employee1 = await query({
      query: "SELECT E.ID, E.Name, E.cardUID, I.timestamp, permission FROM fypdb.iot I JOIN fypdb.employees E ON I.cardUID = E.cardUID ORDER BY I.timestamp;",
      value: [],
    })

    const combinedQuery = {
      employee : employee,
      employee1 : employee1
    }
    res.status(200).json(combinedQuery);  //responds json data of the employee table in api/crud
  } 

  
  if(req.method ==="POST") {
    const employeeName = req.body.Name;
    const cardID = req.body.cardUID;
    const permission = req.body.permission;
    const addEmployee = await query({
      query: "INSERT INTO employees (Name, cardUID, permission) VALUES (?, ?, ?)",
      value: [employeeName, cardID, permission],
    });
    if(addEmployee.insertId){
      message = "success";
    }
    else{
      message = "error";
    }
    let employee = {
      id: addEmployee.insertId,
      name: employeeName,
      code: cardID,
      perm: permission,
    };

    res.status(200).json({ response: {message: message, employee: employee} });
  }

  if(req.method ==="PUT") {
    const employeeID = req.body.ID;  //ID is same as sql column name
    const employeeName = req.body.Name; //Name is same as sql column name
    const cardID = req.body.cardUID;   //cardUID is same as sql column name
    const updateEmployee = await query({
      query: "UPDATE employees SET Name =?,cardUID=? WHERE ID = ?",
      value: [employeeName, cardID, employeeID],
    });

    const result = updateEmployee.affectedRows;
    if(result) {
      message = "success";
    } else {
      message = "error";
    }

    let employee = {
      id: employeeID,
      name: employeeName,
      code: cardID,
    };

    res.status(200).json({ response: {employee: employee, message: message} });
  }

  if(req.method === "DELETE") {    // === comparison operator for strict equality between two values
    
    const employeeID = req.body.ID;  //ID is same as sql column name

    const deleteEmployee = await query({
      query: "DELETE FROM employees WHERE ID = ?",
      value: [employeeID],
    });
    const result = deleteEmployee.affectedRows; 
    if(result) {
      message = "success";
    } else {
      message = "error";
    }

    res.status(200).json({response: {ID: employeeID, message: message}});  //responds json data of the employee table in api/crud
  }
}
