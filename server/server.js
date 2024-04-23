const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getAllDepartments, createDepartment, updateDepartment, deleteDepartment } = require('./databasepg');
const { client } = require('./databasepg');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Routes for Employees
app.get('/employees', async (req, res) => {
    try {
        const employees = await getAllEmployees();
        res.json(employees.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/employees', async (req, res) => {
    try {
        const { emp_no, emp_name, gender, salary, dept_no, age, location, rating } = req.body;
        await createEmployee(emp_no, emp_name, gender, salary, dept_no, age, location, rating);
        res.status(201).json({ message: 'Employee created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/employees/:emp_no', async (req, res) => {
    try {
        const emp_no = req.params.emp_no;
        const { emp_name, gender, salary, dept_no, age, location, rating } = req.body;
        await updateEmployee(emp_no, emp_name, gender, salary, dept_no, age, location, rating);
        res.json({ message: 'Employee updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/employees/:emp_no', async (req, res) => {
    try {
        const emp_no = req.params.emp_no;
        await deleteEmployee(emp_no);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Routes for Departments
app.get('/departments', async (req, res) => {
    try {
        const departments = await getAllDepartments();
        res.json(departments.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/departments', async (req, res) => {
    try {
        const { dept_no, dept_name } = req.body;
        await createDepartment(dept_no, dept_name);
        res.status(201).json({ message: 'Department created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/departments/:dept_no', async (req, res) => {
    try {
        const dept_no = req.params.dept_no;
        const { dept_name } = req.body;
        await updateDepartment(dept_no, dept_name);
        res.json({ message: 'Department updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/departments/:dept_no', async (req, res) => {
    try {
        const dept_no = req.params.dept_no;
        await deleteDepartment(dept_no);
        res.json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get the gender ratio of employees
app.get('/employees/gender-ratio', async (req, res) => {
    try {
        const result = await client.query("SELECT COUNT(*) AS total_count, SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) AS male_count FROM employees");
        const totalCount = parseInt(result.rows[0].total_count);
        const maleCount = parseInt(result.rows[0].male_count);
        const femaleCount = totalCount - maleCount;
        const genderRatio = {
            maleCount: maleCount,
            femaleCount: femaleCount
        };
        res.json(genderRatio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch age distribution of employees
app.get('/employees/age-distribution', async (req, res) => {
    try {
        const ageDistribution = await calculateAgeDistribution(); // Implement this function to calculate age distribution
        res.json(ageDistribution);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Function to calculate age distribution of employees
const calculateAgeDistribution = async () => {
    const ageDistribution = {
        '21-25': 0,
        '26-30': 0,
        '31-35': 0,
        '35+': 0
    };

    // Query your database or perform any necessary operations to get employee ages
    const employees = await client.query('SELECT age FROM employees');

    // Loop through employees and update age distribution
    employees.rows.forEach(employee => {
        const age = employee.age;
        if (age >= 21 && age <= 25) {
            ageDistribution['21-25']++;
        } else if (age >= 26 && age <= 30) {
            ageDistribution['26-30']++;
        } else if (age >= 31 && age <= 35) {
            ageDistribution['31-35']++;
        } else {
            ageDistribution['35+']++;
        }
    });

    return ageDistribution;
};
// Route to fetch age distribution of employees
app.get('/employees/rating-distribution', async (req, res) => {
    try {
        const ratingDistribution = await calculateratingDistribution(); // Implement this function to calculate rating distribution
        res.json(ratingDistribution);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Function to calculate rating distribution of employees
const calculateratingDistribution = async () => {
    const ratingDistribution = {
        'below 4.0':0,
        '4.1-4.2': 0,
        '4.3-4.4': 0,
        '4.5-4.6': 0,
        '4.7-4.8':0,
        '4.9-5.0': 0
    };

    // Query your database or perform any necessary operations to get employee ratings
    const employees = await client.query('SELECT rating FROM employees');

    // Loop through employees and update rating distribution
    employees.rows.forEach(employee => {
        const rating = employee.rating;
        if (rating <4.0){
            ratingDistribution['below 4.0']++;
        } else if (rating >= 4.1 && rating <= 4.2) {
            ratingDistribution['4.1-4.2']++;
        } else if (rating >= 4.3 && rating <= 4.4) {
            ratingDistribution['4.3-4.4']++;
        } else if (rating >= 4.5 && rating <= 4.6) {
            ratingDistribution['4.5-4.6']++;
        } else if (rating >= 4.7 && rating <= 4.8) {
            ratingDistribution['4.7-4.8']++;
        } else {
            ratingDistribution['4.9-5.0']++;
        }
    });

    return ratingDistribution;
};

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
