import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const ThreadDetails = () => {
  const { id } = useParams(); // Get thread ID from URL
  const [thread, setThread] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    // Fetch thread details
    axios.get(`http://localhost:5000/threads/${id}`).then((res) => setThread(res.data));

    // Listen for new replies
    socket.on("receive-reply", (data) => {
      if (data.threadId === id) {
        setThread((prev) => ({ ...prev, replies: [...prev.replies, data.reply] }));
      }
    });

    return () => socket.off("receive-reply");
  }, [id]);

  // Handle reply submission
  const submitReply = async () => {
    if (!reply) return alert("Reply cannot be empty!");

    try {
      const res = await axios.post(`http://localhost:5000/threads/${id}/reply`, { content: reply }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      setThread(res.data);
      setReply("");
    } catch (err) {
      alert("Error submitting reply");
    }
  };

  // Handle upvote
  const upvoteThread = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/threads/${id}/upvote`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      setThread((prev) => ({ ...prev, upvotes: res.data.upvotes }));
    } catch (err) {
      alert("Error upvoting");
    }
  };

  if (!thread) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{thread.title}</h1>
      <p className="mb-4">{thread.content}</p>
      <button className="bg-blue-500 text-white px-4 py-2 mb-4" onClick={upvoteThread}>
        👍 Upvote ({thread.upvotes})
      </button>

      {/* Reply Section */}
      <div className="mb-4">
        <textarea
          placeholder="Write a reply..."
          className="border p-2 w-full mb-2"
          rows="3"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2" onClick={submitReply}>
          Reply
        </button>
      </div>

      {/* Replies */}
      <h2 className="text-xl font-bold mt-4">Replies</h2>
      {thread.replies.length === 0 ? (
        <p>No replies yet.</p>
      ) : (
        thread.replies.map((r, index) => (
          <div key={index} className="border p-2 my-2">
            <p>{r.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ThreadDetails;
