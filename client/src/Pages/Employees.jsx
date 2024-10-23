import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeDeleteModal from "../Modals/EmployeeDeleteModal";
import '../index.css';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    // modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/employees')
            .then((res) => res.json())
            .then((employeesData) => {
                console.log(employeesData);
                setEmployees(employeesData);
            })
            .catch((error) => console.error('Error fetching employees', error));
    }, []);

    // Handling submit
    function handleEmployeeSubmit(newEmployee) {
        setEmployees([...employees, newEmployee]);
    }

    // Handle employee delete
    function handleEmployeeDelete(password) {
        if (password === '123') {
            fetch(`http://127.0.0.1:5555/employees/${selectedEmployeeId}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then(() => setEmployees(employees.filter(employee => employee.id !== selectedEmployeeId)))
                .catch((error) => console.error("Error deleting employee", error));

            // Close modal after confirming the deletion
            setIsModalOpen(false);
        } else {
            alert('Incorrect password');
        }
    }

    // Handling search employee
    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <h1>Employees</h1>

            <div>
                <input
                    className="search"
                    onChange={(event) => setSearch(event.target.value)}
                    value={search}
                    placeholder="Search Employee Name"
                    type="search"
                />
            </div>

            <div>
                <EmployeeForm onAddEmployee={handleEmployeeSubmit} />
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>EMPLOYEE ID</th>
                            <th>NAME</th>
                            <th>ROLE</th>
                            <th>DEPARTMENT</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredEmployees.map((employee) => (
                            <tr key={employee.id || Math.random().toString()}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.role}</td>
                                <td>{employee.department}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setSelectedEmployeeId(employee.id);
                                            setIsModalOpen(true);
                                        }}
                                    >DELETE
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EmployeeDeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleEmployeeDelete}
            />
        </>
    );
}

export default Employees;
