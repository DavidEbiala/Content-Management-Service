const inquirer = require('inquirer');


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
        viewAllDepaartments();
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

  