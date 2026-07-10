# ✨ Shine AI

> **Seek. Shine. Solve. Succeed**
>
> Shine AI is an AI-powered platform that helps users learn, solve problems, and share knowledge through an intuitive and modern interface.

---

## 🔗 API Routes

### 🔐 Authentication Routes

#### Credentials Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Log in with email and password |
| `GET` | `/api/auth/me` | Get the authenticated user's profile |
| `POST` | `/api/auth/logout` | Log out the current user |

#### OAuth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/auth/google` | Redirect to Google OAuth login |
| `GET` | `/api/auth/google/callback` | Google OAuth callback endpoint |
| `GET` | `/api/auth/github` | Redirect to GitHub OAuth login |
| `GET` | `/api/auth/github/callback` | GitHub OAuth callback endpoint |

---

## 🛠️ Technologies Used

### Frontend
- **React** – Component-based UI library
- **Next.js** – Full-stack React framework

### Backend
- **Node.js** – JavaScript runtime
- **Express.js** – Web application framework

### Database
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling (ODM)

### Security & Authentication
- **bcrypt** – Password hashing
- **Helmet** – Secure HTTP headers
- **CORS** – Cross-Origin Resource Sharing middleware
- **crypto** – to generate secret strings
- **oauth** – to facilitate login sessions

### Utilities
- **Morgan** – HTTP request logger
- **dotenv** – Environment variable management
- **JSON Web Token (JWT)** – Stateless authentication using JSON Web Tokens