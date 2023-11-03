import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
    .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    })
    .promise();

export const getAllEmployees = async () => {
    const [result] = await pool.query("select * from employees");
    // result[0].forEach((data) => {
    // console.log(result);
    // });
    return result;
};

const allEmployees = await getAllEmployees();
console.log(allEmployees);

export const getEmployee = async (id) => {
    const [data] = await pool.query(`SELECT * FROM EMPLOYEES WHERE id = ?`, [id]);
    return data[0];
};

const note = await getEmployee(10);
// console.log(note);

export const createEmployee = async (id, area) => {
    const [createEmployeeResult] = await pool.query(
        `INSERT INTO EMPLOYEES (id,area)
    VALUES (?,?)
    `,
        [id, area]
    );

    return createEmployeeResult;
};

const createdEmployee = await createEmployee(3, "Karur");
// console.log(createdEmployee);
