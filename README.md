# **Sangit🎶 - Everything, Everywhere**

Welcome to **Sangit🎶**, a seamless music streaming experience where you can explore, discover, and enjoy everything about music from everywhere! With a rich feature set, modern UI, and smooth integration with the backend, Sangit is your gateway to the world of music.

---

## **🌟 Features**

### 🎵 **Music Streaming**
- Browse, search, and play songs.
- High-quality audio streaming with controls for play, pause, and stop.
- Persistent global song player across the app.

### 📚 **Playlists**
- Create, edit, and delete playlists.
- Add or remove songs to/from playlists.
- View and manage playlists effortlessly.

### 🔍 **Discovery**
- Get personalized song recommendations.
- Explore playback history and rediscover your favorite tracks.
- Follow your favorite artists and never miss their updates.

### 👤 **Profile Management**
- View and update your profile (bio and profile picture).
- Secure authentication and session management with JWT.

### 🔐 **Authentication**
- User registration and login.
- Secured private routes for authenticated users.

---

## **🛠️ Tech Stack**

- **Frontend**: React, Tailwind CSS
- **State Management**: Context API
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Backend**: [Sangit Backend Repository](https://github.com/VinayHajare/Music-Streaming-API) (Spring Boot, MySQL)

---

## **📂 Project Structure**

```plaintext
sangit-frontend/
├── public/                 # Public files like index.html
├── src/                    # Source files
│   ├── components/         # Reusable React components
│   │   ├── Auth/           # Login and Register components
│   │   ├── Profile/        # User Profile component
│   │   ├── Songs/          # Song-related components (Player, List, Search)
│   │   ├── Playlists/      # Playlist-related components
│   │   └── Discover/       # Discovery features (Recommended, Follow Artist)
│   ├── context/           # Auth and Player Context providers
│   ├── hooks/              # Custom hooks like useAuth
│   ├── pages/              # Page components (Login, Dashboard, Profile, etc.)
│   ├── routes/             # PrivateRoute for securing routes
│   ├── utils/              # Utility functions (API handler, token manager)
│   ├── App.js              # Main application component
│   ├── index.css           # CSS containing tailwind CSS rules
│   └── index.js            # Entry point for React
├── package.json            # Project dependencies
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # Project documentation
```

---

## **🚀 Getting Started**

### **1. Prerequisites**
- Node.js (v14 or higher) and npm installed.
- Backend API up and running. Check the [Sangit Backend Repository](https://github.com/VinayHajare/Music-Streaming-API) for setup instructions.

### **2. Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/VinayHajare/Sangit.git
   cd Sangit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the backend API base URL in `/src/utils/api.js`:
   ```javascript
   import axios from "axios";

   const api = axios.create({
     baseURL: "http://localhost:8080/api", // Replace with your backend API URL
   });

   export default api;
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the app in your browser:
   ```plaintext
   http://localhost:3000
   ```

---

## **🧭 Usage**

### **1. Authentication**
- Access the login page at `/`.
- Use the "Don't have an account?" link to register.
- Enter valid credentials to log in.

### **2. Dashboard**
- Navigate to `/dashboard` for quick access to all features:
  - Songs
  - Playlists
  - Discovery
  - Profile

### **3. Songs**
- View songs at `/songs`.
- Search for songs using filters (title, artist, album, genre).
- Play songs directly, and control playback using the global song player.

### **4. Playlists**
- Create playlists at `/playlists/create`.
- View playlists at `/playlists`.
- Add or remove songs in `/playlists/:playlistId`.

### **5. Discovery**
- Get personalized recommendations at `/discover`.
- View playback history at `/history`.
- Follow/unfollow artists at `/follow`.

### **6. Profile**
- View and edit profile details (bio and profile picture) at `/profile`.

---

## **🌐 Deployment**

1. Build the app for production:
   ```bash
   npm run build
   ```

2. Deploy the `build/` folder to your hosting service (e.g., Netlify, Vercel, AWS).

---

## **🧪 Testing**

1. Ensure the backend API is running and accessible.
2. Run the frontend development server:
   ```bash
   npm start
   ```
3. Test user flows:
   - Register and log in.
   - Navigate to the dashboard and explore playlists, discovery, and profile.
   - Verify the song player functionality on all pages.
   - Test API calls for each feature (e.g., adding songs to a playlist, following artists).

---

## **🤝 Contributing**

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## **📄 License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **📞 Contact**

For questions or support, feel free to reach out:

- **Email**: vinayhajare2004@gmail.com
- **GitHub**: [VinayHajare](https://github.com/VinayHajare)

Enjoy streaming with **Sangit🎶**!
