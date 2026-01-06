import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "./EmployeeTable";
import SearchFilter from "./SearchFilter";
import { getEmployees, saveEmployees } from "../utils/storage";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState({ name: "", gender: "", status: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEmployees(getEmployees());
      setLoading(false);
    }, 600); // mock loading
  }, []);

  const deleteEmployee = (id) => {
    if (!window.confirm("Are you sure?")) return;
    const updated = employees.filter(e => e.id !== id);
    setEmployees(updated);
    saveEmployees(updated);
  };

  const printSingleEmployee = (emp) => {
    const win = window.open("", "", "width=900,height=600");
    win.document.write(`
      <h2>Employee Details</h2>
      <p><b>ID:</b> ${emp.id}</p>
      <p><b>Name:</b> ${emp.name}</p>
      <p><b>Gender:</b> ${emp.gender}</p>
      <p><b>DOB:</b> ${emp.dob}</p>
      <p><b>State:</b> ${emp.state}</p>
      <p><b>Status:</b> ${emp.active ? "Active" : "Inactive"}</p>
    `);
    win.print();
    win.close();
  };

  const filteredEmployees = employees.filter(e =>
    e.name.toLowerCase().includes(filter.name.toLowerCase()) &&
    (filter.gender ? e.gender === filter.gender : true) &&
    (filter.status ? e.active.toString() === filter.status : true)
  );

  const total = employees.length;
  const active = employees.filter(e => e.active).length;

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Employee Dashboard</h1>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      <div className="summary">
        <div className="card blue"><h3>Total</h3><p>{total}</p></div>
        <div className="card green"><h3>Active</h3><p>{active}</p></div>
        <div className="card red"><h3>Inactive</h3><p>{total - active}</p></div>
      </div>

      <button className="add-btn" onClick={() => navigate("/employee")}>
        Add Employee
      </button>

      <SearchFilter onFilter={setFilter} />

      <EmployeeTable
        employees={filteredEmployees}
        onEdit={(id) => navigate(`/employee?id=${id}`)}
        onDelete={deleteEmployee}
        onPrint={printSingleEmployee}   
      />

      <button className="print" onClick={() => window.print()}>
        Print All Employees
      </button>
    </div>
  );
}

export default Dashboard;
