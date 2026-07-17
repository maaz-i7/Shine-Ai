# ✨ Shine AI

> **Seek. Shine. Solve. Succeed**
>
> Shine AI is an AI-powered platform that helps users learn, solve problems, and share knowledge through an intuitive and modern interface.

---

## 🔗 API & Routes

### 🖥️ Backend API (Express)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user with email/username and password. |
| `POST` | `/api/auth/login` | Authenticate a user using email/username and password. |
| `POST` | `/api/auth/oauth-sync` | Create or sync a user after successful Google/GitHub OAuth authentication. |
| `POST` | `/api/online-compiler/execute-code` | Compile and execute the submitted source code. |
| `POST` | `/api/problem/ensure` | Create a problem if it doesn't exist, otherwise return the existing one. |
| `POST` | `/api/workspace/ensure` | Create a workspace if it doesn't exist, otherwise return the existing one. |
| `GET` | `/api/workspace/problem/:problemId?userId=:userId` | Fetch a user's workspace for a specific problem. |
| `GET` | `/api/workspace/user/:userId` | Fetch all workspaces belonging to a user. |

---

### 🔐 NextAuth Authentication Routes

These routes are automatically provided by **NextAuth** for OAuth authentication.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/auth/signin/google` | Redirect to Google sign-in. |
| `GET` | `/api/auth/callback/google` | Handle Google OAuth callback and create a session. |
| `GET` | `/api/auth/signin/github` | Redirect to GitHub sign-in. |
| `GET` | `/api/auth/callback/github` | Handle GitHub OAuth callback and create a session. |

---

### 🌐 Frontend Routes

| Route | Description | Access |
| :--- | :--- | :--- |
| `/` | Landing page introducing Shine AI and its features. | Public |
| `/login` | Sign in or create an account using credentials or OAuth. | Public |
| `/problems/new` | Create a new problem workspace by uploading screenshots or entering problem details. | Protected |
| `/problem/:id` | Solve a problem inside the coding workspace with the editor, AI assistant, and execution console. | Protected |
| `/dashboard` | View and manage all of your problem workspaces, progress, and AI scores. | Protected |

---

## 🛠️ Technologies Used

### Frontend
- **React** – Component-based UI library
- **Next.js** – Full-stack React framework
- **react-hook-form** – For handling forms

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
- **next-auth** – to facilitate login sessions

### Utilities
- **Morgan** – HTTP request logger
- **dotenv** – Environment variable management
- **JSON Web Token (JWT)** – Stateless authentication using JSON Web Tokens
- **Lucide React** – Modern customizable SVG icon library for React components and UI icons.
- **Monaco editor** – for integrating an IDE
- **react-markdown** – Markdown rendering in React components
- **remark-gfm** – Support for GitHub Flavored Markdown (tables, task lists, strikethrough, etc.)
- **remark-math** – Parses LaTeX math expressions in Markdown
- **rehype-katex** – Renders LaTeX math using KaTeX
- **rehype-raw** – Allows rendering of raw HTML inside Markdown
- **KaTeX** – Fast rendering of mathematical expressions with CSS styling
- **Multer** – Used to upload problem images from users so they can be processed by the AI for problem extraction.
- **Zustand** – Lightweight state management library for global state management. Used to share application state such as generated problem data, workspace information, and UI state across components without prop drilling.