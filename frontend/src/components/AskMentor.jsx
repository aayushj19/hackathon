import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Update with your backend URL

const AskMentor = () => {
  const [question, setQuestion] = useState("");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();

    // Listen for real-time updates
    socket.on("new-mentor-question", (newQuestion) => {
      setQuestions((prev) => [newQuestion, ...prev]);
    });

    socket.on("mentor-question-answered", ({ id, answer }) => {
      setQuestions((prev) =>
        prev.map((q) => (q._id === id ? { ...q, answer, status: "Answered" } : q))
      );
    });

    socket.on("mentor-question-status-updated", ({ id, status }) => {
      setQuestions((prev) =>
        prev.map((q) => (q._id === id ? { ...q, status } : q))
      );
    });

    return () => {
      socket.off("new-mentor-question");
      socket.off("mentor-question-answered");
      socket.off("mentor-question-status-updated");
    };
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("/ask-mentor");
      setQuestions(res.data);
    } catch (err) {
      console.error("Error fetching mentor questions:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !topic) return alert("Please enter both question and topic");

    try {
      const res = await axios.post(
        "/ask-mentor",
        { question, topic },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setQuestion("");
      setTopic("");
    } catch (err) {
      console.error("Error submitting question:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Ask a Mentor</h2>
      <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded-lg">
        <input
          type="text"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Topic (e.g. React, Data Structures)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Submit
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-3">Your Questions</h3>
      <ul>
        {questions.map((q) => (
          <li key={q._id} className="border-b p-3">
            <p className="font-semibold">{q.question}</p>
            <p className="text-sm text-gray-500">Topic: {q.topic}</p>
            <p className={`text-sm mt-1 ${q.status === "Answered" ? "text-green-600" : "text-yellow-500"}`}>
              {q.status}
            </p>
            {q.answer && <p className="mt-2 text-gray-700"><strong>Mentor Answer:</strong> {q.answer}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AskMentor;
