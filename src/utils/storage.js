export const getEmployees = () =>
  JSON.parse(localStorage.getItem("employees")) || [];

export const saveEmployees = (data) =>
  localStorage.setItem("employees", JSON.stringify(data));

export const getEmployeeById = (id) =>
  getEmployees().find(e => e.id === id);
