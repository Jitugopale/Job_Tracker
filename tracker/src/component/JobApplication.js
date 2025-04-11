import React, { useState, useEffect } from "react";
import axios from "axios";

const JobApplication = () => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: "",
    link: ""
  });
  const [editId, setEditId] = useState(null);
const [editForm, setEditForm] = useState({
  company: "",
  role: "",
  status: "Applied",
  appliedDate: "",
  link: "",
});

  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        `https://job-tracker-backend-a0kd.onrender.com/api/jobs/getAll${filter ? `?status=${filter}` : ""}`
      );
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://job-tracker-backend-a0kd.onrender.com/api/jobs/add", form);
      setForm({ company: "", role: "", status: "Applied", appliedDate: "", link: "" });
      fetchJobs();
    } catch (error) {
      console.error("Error adding job:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://job-tracker-backend-a0kd.onrender.com/api/jobs/delete/${id}`);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error.message);
    }
  };
  const startEdit = (job) => {
    setEditId(job._id);
    setEditForm({
      company: job.company,
      role: job.role,
      status: job.status,
      appliedDate: job.appliedDate.slice(0, 10),
      link: job.link,
    });
  };
  
  const cancelEdit = () => {
    setEditId(null);
  };
  
  const handleUpdate = async (id) => {
    try {
      await axios.put(`https://job-tracker-backend-a0kd.onrender.com/api/jobs/update/${id}`, editForm);
      setEditId(null);
      fetchJobs();
    } catch (error) {
      console.error("Error updating job:", error.message);
    }
  };
  
  return (
    <div className="container mt-5">
        <div className="card p-3">
      <h2 className="text-center mb-4">Job Application Tracker</h2>

      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            required
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            value={form.appliedDate}
            onChange={(e) => setForm({ ...form, appliedDate: e.target.value })}
            required
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Link"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
          />
        </div>

        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            Add Job
          </button>
        </div>
      </form>
      </div>

      <div className="mb-3 mt-5">
        <label className="form-label me-2">Filter by Status:</label>
        <select
          className="form-select w-auto d-inline"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <table className="table table-striped">
  <thead>
    <tr>
      <th>Company</th>
      <th>Role</th>
      <th>Status</th>
      <th>Applied Date</th>
      <th>Link</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  {jobs.map((job) =>
    editId === job._id ? (
      <tr key={job._id}>
        <td>
          <input
            className="form-control"
            value={editForm.company}
            onChange={(e) =>
              setEditForm({ ...editForm, company: e.target.value })
            }
          />
        </td>
        <td>
          <input
            className="form-control"
            value={editForm.role}
            onChange={(e) =>
              setEditForm({ ...editForm, role: e.target.value })
            }
          />
        </td>
        <td>
          <select
            className="form-select"
            value={editForm.status}
            onChange={(e) =>
              setEditForm({ ...editForm, status: e.target.value })
            }
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </td>
        <td>
          <input
            type="date"
            className="form-control"
            value={editForm.appliedDate}
            onChange={(e) =>
              setEditForm({ ...editForm, appliedDate: e.target.value })
            }
          />
        </td>
        <td>
          <input
            className="form-control"
            value={editForm.link}
            onChange={(e) =>
              setEditForm({ ...editForm, link: e.target.value })
            }
          />
        </td>
        <td>
          <button
            className="btn btn-success btn-sm me-2"
            onClick={() => handleUpdate(job._id)}
          >
            Save
          </button>
          <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>
            Cancel
          </button>
        </td>
      </tr>
    ) : (
      <tr key={job._id}>
        <td>{job.company}</td>
        <td>{job.role}</td>
        <td>{job.status}</td>
        <td>{new Date(job.appliedDate).toLocaleDateString()}</td>
        <td>
          <a href={job.link} target="_blank" rel="noreferrer">
            View Job
          </a>
        </td>
        <td>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => startEdit(job)}
          >
            Update
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(job._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    )
  )}
</tbody>

</table>

    </div>
  );
};

export default JobApplication;
