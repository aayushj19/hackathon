import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState("");
    
  const handleSearch = async () => {
    if (!query) return;

    try {
      const res = await axios.get(`http://localhost:5000/search?query=${query}`);
      onResults(res.data);
    } catch (err) {
      alert("Search error");
    }
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        className="border p-2 flex-grow rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search discussions..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
        onClick={handleSearch}
      >
        <FaSearch /> Search
      </button>
    </div>
  );
};

export default SearchBar;
