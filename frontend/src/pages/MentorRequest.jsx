import { useEffect, useState } from "react";
import axios from "axios";

const MentorRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/mentors/requests", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => setRequests(res.data))
      .catch(() => alert("Error fetching mentor requests"));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mentor Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No pending requests.</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} className="border p-4 mb-3 rounded-lg shadow-md bg-white">
            <p className="text-gray-700">
              <strong>{req.user.username}:</strong> {req.question}
            </p>
            <p className="text-sm text-gray-500">Status: {req.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MentorRequests;
