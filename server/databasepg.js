const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Ganesh@264",
    database: "task"
});

client.connect();

// Functions for Employees
const getAllEmployees = () => {
    return client.query('SELECT * FROM employees');
};

const createEmployee = (emp_no, emp_name, gender, salary, dept_no, age, location, rating) => {
    return client.query('INSERT INTO employees (emp_no, emp_name, gender, salary, dept_no, age, location, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [emp_no, emp_name, gender, salary, dept_no, age, location, rating]);
};

const updateEmployee = (emp_no, emp_name, gender, salary, dept_no, age, location, rating) => {
    return client.query('UPDATE employees SET emp_name = $2, gender = $3, salary = $4, dept_no = $5, age = $6, location = $7, rating = $8 WHERE emp_no = $1', [emp_no, emp_name, gender, salary, dept_no, age, location, rating]);
};

const deleteEmployee = (emp_no) => {
    return client.query('DELETE FROM employees WHERE emp_no = $1', [emp_no]);
};

// Functions for Departments
const getAllDepartments = () => {
    return client.query('SELECT * FROM departments');
};

const createDepartment = (dept_no, dept_name) => {
    return client.query('INSERT INTO departments (dept_no, dept_name) VALUES ($1, $2)', [dept_no, dept_name]);
};

const updateDepartment = (dept_no, dept_name) => {
    return client.query('UPDATE departments SET dept_name = $2 WHERE dept_no = $1', [dept_no, dept_name]);
};

const deleteDepartment = (dept_no) => {
    return client.query('DELETE FROM departments WHERE dept_no = $1', [dept_no]);
};

module.exports = {
    client, // Export the client variable
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getAllDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
};
