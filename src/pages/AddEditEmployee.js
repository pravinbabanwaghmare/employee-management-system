import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getEmployees, saveEmployees } from "../utils/storage";

function AddEditEmployee() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editId = params.get("id");

  const [form, setForm] = useState({
    id: null,
    name: "",
    gender: "",
    dob: "",
    state: "",
    active: true,
    image: ""
  });

  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (editId) {
      const emp = getEmployees().find(e => e.id === Number(editId));
      if (emp) setForm(emp);
    }
  }, [editId]);

  const validate = () => {
    let err = {};
    if (!form.name.trim()) err.name = "Name required";
    if (!form.gender) err.gender = "Gender required";
    if (!form.dob) err.dob = "DOB required";
    if (!form.state.trim()) err.state = "State required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageError("");

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setImageError("Only JPG / PNG allowed");
      return;
    }

    if (file.size > 200 * 1024) {
      setImageError("Image must be under 200KB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () =>
      setForm(prev => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    let list = getEmployees();
    if (editId) {
      list = list.map(emp => emp.id === form.id ? form : emp);
    } else {
      list.push({ ...form, id: Date.now() });
    }

    saveEmployees(list);
    navigate("/");
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>{editId ? "Edit Employee" : "Add Employee"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <small className="error">{errors.name}</small>}
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              value={form.gender}
              onChange={e => setForm({ ...form, gender: e.target.value })}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>DOB</label>
            <input
              type="date"
              value={form.dob}
              onChange={e => setForm({ ...form, dob: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              value={form.state}
              onChange={e => setForm({ ...form, state: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Profile Image</label>
            <input type="file" accept="image/*" onChange={handleImage} />
            {imageError && <small className="error">{imageError}</small>}
            {form.image && <img src={form.image} className="preview-img" />}
          </div>

          {/* ✅ PERFECT ACTIVE UI */}
          <div className="form-group">
            <label>Status</label>
            <div className="active-checkbox">
              <input
                type="checkbox"
                id="activeEmp"
                checked={form.active}
                onChange={e =>
                  setForm({ ...form, active: e.target.checked })
                }
              />
              <label htmlFor="activeEmp">Active Employee</label>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn primary" type="submit">
              {editId ? "Update" : "Save"}
            </button>
            <button
              type="button"
              className="btn outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditEmployee;
