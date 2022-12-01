import pool, { executeQuery } from '../config/Db';
const getAllEmployees = async (req,res) => {
    let employeeData = await executeQuery('select * from employee',[]);
    res.send(employeeData);
};

export {getAllEmployees};