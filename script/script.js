const inquirer = require('inquirer');
const connection = require('../config/connection.js')


inquirer
  .prompt([
    {
      type: 'list',
      name: 'choices',
      message: 'Select an option',
      choices:['View all departments', 'View all roles', 'View all employees',
      'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    },
  ]). then ((answers) => {
    const {choices} = answers;
    if (choices === 'View all departments' ){
        viewAllDepartments();
    }
    if( choices === 'View all roles'){
        viewAllRoles();
    }
    if (choices === 'View all employees'){
        viewAllEmployees();
    }
    if (choices === 'Add a department'){
        addADepartment();
    }
    if (choices === 'Add a role'){
        addARole();
    }
    if (choices === 'Add an employee'){
        addEmployee();
    }
    if (choices === 'Update an employee role'){
        updateEmployee();
    }
  });

  const viewAllDepartments = () =>{
    const query = `SELECT department.id AS id, department.names AS department FROM department`;
    connection.promise().query(query, (error, response) => {
        if (error) throw error;
        console.table(response);
        promptUser();
      });
  }