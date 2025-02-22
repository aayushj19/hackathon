import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import SearchBar from "./searchBar";
import Navbar from "./Navbar";

const socket = io("http://localhost:5000");

const Threads = () => {
  const [threads, setThreads] = useState([]);
  const [filteredThreads, setFilteredThreads] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/threads").then((res) => {
      setThreads(res.data);
      setFilteredThreads(res.data);
    });

    socket.on("receive-thread", (thread) => {
      setThreads((prev) => [thread, ...prev]);
      setFilteredThreads((prev) => [thread, ...prev]);
    });

    return () => socket.off("receive-thread");
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Discussion Threads</h2>

      {/* AI-Powered Search Bar */}
      <SearchBar onResults={setFilteredThreads} />

      {filteredThreads.length === 0 ? (
        <p>No discussions found.</p>
      ) : (
        filteredThreads.map((thread) => (
          <div key={thread._id} className="border p-4 mb-2">
            <Link to={`/thread/${thread._id}`} className="font-bold text-blue-600 hover:underline">
              {thread.title}
            </Link>
            <p>{thread.content}</p>
            <p className="text-sm text-gray-500">Upvotes: {thread.upvotes}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Threads;
