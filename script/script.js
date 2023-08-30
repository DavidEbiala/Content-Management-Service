const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  dialect: 'mysql',
  database: 'deparments_db',
},
console.log(`Connected to the books_db database.`)
);



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
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, roles.title, employee.manager_id FROM employee JOIN roles ON employee.role_id = roles.id', function (err, results) {
      console.table(results);
      console.log("Employees viewed!\n");
      if (err) throw err;
      firstPrompt();
    });
  };

  function viewAllDepartments (){
    console.log("Viewing departments\n");
    connection.query('SELECT department.id, department.names FROM department', function(err, results){
      console.table(results);
      console.log("Deparments viewed!\n");
      if (err) throw err;
      firstPrompt();
    })
  };

  function viewAllRoles (){
    console.log("Viewing roles\n");
    connection.query('SELECT roles.id, roles.title, roles.salary, department.names FROM roles JOIN department ON roles.department_id = department_id', function(err, results){
      console.table(results);
      console.log("Roles viewed!\n");
      if (err) throw err;
      firstPrompt();
    })
  };

  function addADepartment (){
    console.log("Adding a department\n");
    inquirer.prompt([{
      type: 'input',
      name: 'department',
      message: 'What is the name of the new department?',
    }]).then((answers) => {
      connection.query('INSERT INTO department (names) VALUES (?)',[answers.department], function(err, results){
        console.table(results);
        console.log("Deparments added!\n");
        if (err) throw err;
        firstPrompt();
      })
    })
  };

  function addARole (){
    console.log("Adding a role\n");
    connection.query(`SELECT * FROM department`, function (err, results){
      if (err) throw err;
      inquirer.prompt([{
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the new department?',
  
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
      },
      {
        type: 'list',
        name: 'department',
        message: 'Which department does the role belong to?',
        choices: () => {
          let array = [];
          for (let i = 0; i <results.length; i++){
            array.push(results[i].name);
          }
          return array;
        }
      }
    ]).then((answers) => {
      for (var i =0; i< results.length; i++){
        if (results[i].name === answers.department){
          var department = results[i]
        }
      }
        connection.query('INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)',[answers.roleName, answers.salary, department.id], function(err, results){
          console.table(results);
          console.log("Deparments added!\n");
          if (err) throw err;
          firstPrompt();
        })
      })
    })
    
  };

  function updateEmployee(){
    console.log("Updating Employee");
    connection.query(`SELECT * FROM employee, roles`, (err, results) => {
      if (err) throw err;

      inquirer.prompt([
        {
        type: 'list',
        name: 'employee',
        message: 'Which employee role do you want to update?',
        choices: () => {
          let array = [];
          for (let i = 0; i< results.length; i++){
            array.push(results[i].last_name);
          }
          let employeeArray = [... new Set(array)];
          return employeeArray;
        }
      },
      {
        type: 'list',
        name: 'roles',
        message: 'What is their new role?',
        choices: () => {
          let array = [];
          for (let i = 0; i < results.length; i++){
            array.push(results[i].title);
          }
          let newArray = [...new Set(array)];
          return newArray;
        }
      }
    ]). then((answers) =>{
      for (let i =0; i< results.length; i++){
        if(results[i].last_name === answers.employee) {
          var names = results[i];
        }
      }
      for (var i = 0; i < results.length; i++) {
        if (results[i].title === answers.role) {
            var roles = results[i];
        }
    }

    connection.query(`UPDATE employee SET ? WHERE ?`, [{role_id: roles}, {last_name: names}], (err, results) => {
        if (err) throw err;
        console.log(`Updated ${answers.employee} role to the database.`)
        employee_tracker();
    });
    })
    })
  }


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });