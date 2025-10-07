import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API = import.meta.env.VITE_API_URL;


const Assignments = () => {
  const [add, setAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("not-started");
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // Fetch assignments on mount
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(`${API}/assignments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching assignments:", err.response?.data || err);
      }
    };
    fetchAssignments();
  }, [token]);

  // Create new assignment
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API}/assignments`,
        { title, description, subject, dueDate, status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refetch assignments
      const res = await axios.get(`${API}/assignments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);

      // Reset form
      setTitle("");
      setDescription("");
      setSubject("");
      setDueDate("");
      setStatus("not-started");
      setAdd(false);
    } catch (err) {
      console.error("Error creating assignment:", err.response?.data || err);
      alert(err.response?.data?.message || "Unauthorized. Please log in again.");
    }
  };

  

  return (
    <div className="p-6">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Assignments</h2>
        <button
          onClick={() => setAdd(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
        >
          <FaPlus /> Add Assignment
        </button>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.length === 0 ? (
          <p className="text-gray-500">No assignments yet.</p>
        ) : (
          data.map((a) => (
            <div
              key={a._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-gray-800">{a.title}</h3>
              <p className="text-gray-600">{a.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Subject: <span className="font-medium">{a.subject}</span>
              </p>
              <p className="text-sm text-gray-500">
                Due: {new Date(a.dueDate).toLocaleDateString()}
              </p>
              <span
                className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  a.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : a.status === "in-progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {a.status}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {add && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8 relative">
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Add Assignment
            </h1>
            <p className="text-gray-600 mb-6">
              Fill in the details to create a new assignment
            </p>

            {/* Form */}
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setAdd(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    
    </div>
  );
};

export default Assignments;
