// script.js

// Function to save employee data to local storage
function saveEmployee() {
    const empID = document.getElementById('empID').value;
    const empName = document.getElementById('empName').value;
    const empDept = document.getElementById('empDept').value;

    if (!empID || !empName || !empDept) {
        alert("All fields are required.");
        return;
    }

    const employeeData = {
        id: empID,
        name: empName,
        department: empDept,
        salary: null, // Initialize salary as null
    };

    // Save employee data to local storage
    localStorage.setItem(empID, JSON.stringify(employeeData));
    alert("Employee saved successfully!");

    // Clear form fields
    document.getElementById('employeeForm').reset();
}

// Function to search for employee data by ID
function searchEmployee() {
    const empID = document.getElementById('empID').value;
    const resultDisplay = document.getElementById('searchResult');
    const detailsDisplay = document.getElementById('employeeDetails');

    // Retrieve employee data from local storage
    const employeeData = localStorage.getItem(empID);
    if (employeeData) {
        const employee = JSON.parse(employeeData);
        resultDisplay.textContent = `Found Employee: ${employee.name}, Department: ${employee.department}`;
        resultDisplay.style.color = "#1abc9c";

        // Display the employee details (salary info if available)
        if (employee.salary) {
            detailsDisplay.innerHTML = `
                <strong>Employee Details:</strong><br>
                ID: ${employee.id}<br>
                Name: ${employee.name}<br>
                Department: ${employee.department}<br>
                Salary: ${employee.salary.basicSalary}<br>
                HRA: ${employee.salary.hra}<br>
                Bonus: ${employee.salary.bonus}<br>
                Deductions: ${employee.salary.deductions}<br>
                Net Salary: ${employee.salary.netSalary}
            `;
        } else {
            detailsDisplay.innerHTML = `<strong>No salary information found for this employee.</strong>`;
        }
    } else {
        resultDisplay.textContent = "Employee not found.";
        detailsDisplay.innerHTML = ""; // Clear details if employee not found
    }
}

// Function to save salary data for an employee
function saveSalary() {
    const empID = document.getElementById('salaryEmpID').value;
    const basicSalary = parseFloat(document.getElementById('basicSalary').value) || 0;
    const hra = parseFloat(document.getElementById('hra').value) || 0;
    const bonus = parseFloat(document.getElementById('bonus').value) || 0;
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;

    // Calculate net salary
    const netSalary = basicSalary + hra + bonus - deductions;

    // Retrieve employee data from local storage
    const employeeData = localStorage.getItem(empID);
    if (employeeData) {
        const employee = JSON.parse(employeeData);

        // Update the employee's salary information
        employee.salary = {
            basicSalary: basicSalary,
            hra: hra,
            bonus: bonus,
            deductions: deductions,
            netSalary: netSalary,
        };

        // Save updated employee data back to local storage
        localStorage.setItem(empID, JSON.stringify(employee));
        alert("Salary information saved successfully!");

        // Clear salary form fields
        document.getElementById('salaryForm').reset();
    } else {
        alert("Employee not found. Please save the employee first.");
    }
}

// Function to calculate net salary
function calculateNetSalary() {
    const basicSalary = parseFloat(document.getElementById('basicSalary').value) || 0;
    const hra = parseFloat(document.getElementById('hra').value) || 0;
    const bonus = parseFloat(document.getElementById('bonus').value) || 0;
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;

    const netSalary = basicSalary + hra + bonus - deductions;
    document.getElementById('netSalary').value = netSalary.toFixed(2);
}

// Function to save payment data (to be implemented as needed)
function savePayment() {
    const payEmpID = document.getElementById('payEmpID').value;
    const paymentAmount = document.getElementById('paymentAmount').value;
    const paymentMode = document.getElementById('paymentMode').value;

    // Here you can add functionality to save payment data as needed
    console.log(`Payment Details - Employee ID: ${payEmpID}, Amount: ${paymentAmount}, Mode: ${paymentMode}`);
    alert("Payment saved successfully! (Check console for details)");
}
