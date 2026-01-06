function EmployeeTable({ employees, onEdit, onDelete, onPrint }) {
  return (
    <div className="table-wrapper">
      <table className="emp-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>State</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 && (
            <tr>
              <td colSpan="8" className="no-data">No Employees Found</td>
            </tr>
          )}

          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>
                {emp.image ? (
                  <img src={emp.image} className="profile-img" />
                ) : (
                  <div className="no-img">N/A</div>
                )}
              </td>
              <td>{emp.name}</td>
              <td>{emp.gender}</td>
              <td>{emp.dob}</td>
              <td>{emp.state}</td>
              <td>
                <span className={emp.active ? "status active" : "status inactive"}>
                  {emp.active ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                <button className="btn edit" onClick={() => onEdit(emp.id)}>Edit</button>
                <button className="btn delete" onClick={() => onDelete(emp.id)}>Delete</button>
                <button className="btn primary" onClick={() => onPrint(emp)}>Print</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
