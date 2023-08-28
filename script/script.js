const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const connection = require('../config/connection.js')


connection.connect(function (err) {
  if(err) throw(err)
  console.log("connected as id " + connection.threadId);
    console.log(`
    ╔═══╗─────╔╗──────────────╔═╗╔═╗
    ║╔══╝─────║║──────────────║║╚╝║║
    ║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
    ║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
    ║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
    ╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
    ───────║║──────╔═╝║─────────────────────╔═╝║
    ───────╚╝──────╚══╝─────────────────────╚══╝`)
    // runs the app
    firstPrompt();
});
function firstPrompt(){
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
}


  function viewAllEmployees () {
    console.log("Viewing employees\n");
    const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
    ON m.id = e.manager_id`
    
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Employees viewed!\n");
  
      firstPrompt();
    });
  }
