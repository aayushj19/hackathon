# 💬 CodeMentor

A centralized, structured, and interactive platform for coding discussions, mentorship, and collaboration. 

## 🚀 Features

✅ **Real-time Discussion Forum** - Topic-based threads and Q&A.  
✅ **AI-powered Search** - Suggests relevant discussions & solutions.  
✅ **Gamification System** - Leaderboards, badges, and upvotes to boost engagement.  
✅ **Code Snippet Sharing** - For easy coding discussions.  
✅ **"Ask a Mentor" Feature** - Get direct guidance from experts.  
✅ **Automated Moderation** - AI-based spam filtering for quality discussions.  

---

## 🛠️ Tech Stack

### **Frontend**
- React.js
- Tailwind CSS
- React Router
- Axios
- WebSockets (Socket.io)

### **Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- OpenAI API (for AI-powered search & suggestions)

### **Other Integrations**
- WebSockets (for real-time updates)
---

## 📌 Environment Variables  

Before running the project, create a `.env` file in the root directory of your **backend** and add the following:  

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

### Where to Get These?
- **MONGO_URI** → Get it from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **JWT_SECRET** → Generate one using:
  ```sh
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- **OPENAI_API_KEY** → Obtain it from [OpenAI API](https://platform.openai.com/).

---

## 🔧 Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/CodeMentor.git
   cd CodeMentor
   ```

2. **Backend Setup**
   ```sh
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Open `http://localhost:3000/` in your browser.

---

## 📜 API Endpoints

### **Threads**
- `POST /threads` → Create a new discussion thread.
- `GET /threads` → Get all threads.
- `GET /threads/:id` → Get a single thread by ID.
- `POST /threads/:id/reply` → Reply to a thread.
- `PUT /threads/:id/upvote` → Upvote a thread.

### **Mentorship**
- `POST /mentors/ask` → Ask a mentor a question.
- `GET /mentors/questions` → Get all mentor-related questions.

---

## 🎯 Future Enhancements
- AI-powered automated code review system.
- Video call integration for mentorship.
- Advanced topic categorization using NLP.

---

## 🙌 Contributors
- **[Aayush]** - Founder & Developer

Contributions are welcome! Feel free to fork this repo and submit a pull request. 🚀

