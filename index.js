const express = require('express');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initialize data array to store Employee records
let employees = [
    {
      id: 1,
      name: 'John Doe',
      course: 'Computer Science',
      roll_no: 'CS001'
    },
    {
      id: 2,
      name: 'Jane Smith',
      course: 'Electrical Engineering',
      roll_no: 'EE002'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      course: 'Mechanical Engineering',
      roll_no: 'ME003'
    },
    {
      id: 4,
      name: 'Alice Brown',
      course: 'Civil Engineering',
      roll_no: 'CE004'
    }
  ];

// Get All Employees Data (Read)
app.get('/', (req, res) => {
    res.json(employees);
});

// Get a Single Employee Record (Read)
app.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
});

// Insert a New Employee Record (Create)
app.post('/', (req, res) => {
    const { name, course, roll_no } = req.body;
    const newEmployee = {
        id: employees.length + 1,
        name,
        course,
        roll_no
    };
    employees.push(newEmployee);
    res.status(201).json({ message: 'Employee added successfully' });
});

// Update an Employee Record (Update)
app.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, course, roll_no } = req.body;
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
        employees[index] = { ...employees[index], name, course, roll_no };
        res.status(200).json({ message: 'Employee updated successfully' });
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
});

// Partially Update an Employee Record (Update)
app.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updates = req.body;
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
        employees[index] = { ...employees[index], ...updates };
        res.status(200).json({ message: 'Employee updated successfully' });
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
});

// Delete an Employee Record
app.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
        employees.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 