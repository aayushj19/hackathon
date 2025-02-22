import React, { useEffect, useState } from "react";
import { getThreads } from '../api/api';  
import { Link } from "react-router-dom";

const Home = () => {
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        getThreads().then(setThreads);
    }, []);

    return (
        <div>
            <h2>Latest Threads</h2>
            {threads.map(thread => (
                <div key={thread._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
                    <h3><Link to={`/thread/${thread._id}`}>{thread.title}</Link></h3>
                    <p>{thread.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;