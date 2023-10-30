import employeesData from "../models/employees.json" assert { type: "json" };

let employees = employeesData;

const getAllEmployees = (req, res) => {
  res.json(employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: employees.length + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }

  employees.push(newEmployee);
  res.status(201).json(employees);
};

const updateEmployee = (req, res) => {
  const employee = employees.find((emp) => emp.id === parseInt(req.body.id));
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  employees.sort((a, b) => a.id - b.id);
  res.json(employees);
};

const deleteEmployee = (req, res) => {
  const employee = employees.find((emp) => emp.id === parseInt(req.body.id));
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }

  employees = employees.filter((emp) => emp.id !== parseInt(req.body.id));
  res.json(employees);
};

const getEmployee = (req, res) => {
  const employee = employees.find((emp) => emp.id === parseInt(req.params.id));
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

export {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
