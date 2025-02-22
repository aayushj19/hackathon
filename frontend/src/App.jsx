import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Threads from "./components/Thread";
import ThreadDetails from "./components/ThreadDetails";
import AskMentor from "./components/AskMentor";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <div className="p-4">
        <h1 className="text-3xl font-semibold  text-blue-500">CodeMentors</h1>
        <Routes>
          <Route path="/" element={<Threads />} />
          <Route path="/thread/:id" element={<ThreadDetails />} />
          <Route path="/askmentor" element={<AskMentor />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
