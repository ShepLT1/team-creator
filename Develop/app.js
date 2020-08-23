const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const allEmployeesArr = [];

function writeToFile(fileName, data) {

    fs.writeFile(fileName, data, function(err) {

        if (err) {
            return console.log(err);
        }

        console.log("Success!");

    })

}

function createManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the manager's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the manager's ID number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the manager's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "officeNumber"
        }
    ]).then(function(response) {
        const manager = new Manager (response.name, response.id, response.email, response.officeNumber);
        allEmployeesArr.push(manager);
        createTeam();
    })

}

function createTeam() {
    inquirer.prompt([
        {
            type: "list",
            message: "Choose which type of employee to add.",
            name: "employeeType",
            choices: ["Engineer", "Intern", "No other employees"]
        }
    ]).then(function(response) {
        switch(response.employeeType) {
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            default:
                const htmlFile = render(allEmployeesArr);
                writeToFile(outputPath, htmlFile);

        }
    })
}

function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the engineer's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the engineer's ID number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the engineer's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the engineer's github username?",
            name: "github"
        }
    ]).then(function(response) {
        const engineer = new Engineer (response.name, response.id, response.email, response.github);
        allEmployeesArr.push(engineer);
        createTeam();
    })
}

function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the intern's ID number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the intern's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "Which school does the intern attend?",
            name: "school"
        }
    ]).then(function(response) {
        const intern = new Intern (response.name, response.id, response.email, response.school);
        allEmployeesArr.push(intern);
        createTeam();
    })
}

createManager();