import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

const ThreadCard = ({ thread, handleUpvote }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border p-4 mb-3 rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-300"
    >
      <Link to={`/thread/${thread._id}`} className="font-bold text-xl text-blue-600 hover:underline">
        {thread.title}
      </Link>
      <p className="text-gray-700">{thread.content}</p>
      <div className="flex justify-between items-center text-gray-500 text-sm mt-2">
        <span>Upvotes: {thread.upvotes}</span>
        <button
          className="flex items-center text-green-600 hover:text-green-800"
          onClick={() => handleUpvote(thread._id)}
        >
          <FaArrowUp className="mr-1" /> Upvote
        </button>
      </div>
    </motion.div>
  );
};

export default ThreadCard;
