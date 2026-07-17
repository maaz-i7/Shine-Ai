# ✨ Shine AI

> **Seek. Shine. Solve. Succeed**
>
> Shine AI is an AI-powered platform that helps users learn, solve problems, and share knowledge through an intuitive and modern interface.

---

## 🔗 API Routes

---

### 🖥️ Express Backend Routes

These routes are implemented in the Express backend and handle authentication, problem management, and code execution.

#### 🔐 Authentication

| Method | Endpoint | Description | Payload Expectation |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Registers a new local user, hashes the password, and stores the user in MongoDB. | `{ name, username, email, password }` |
| `POST` | `/api/auth/login` | Authenticates a user using email/username and password. Also checks for OAuth-only accounts and returns an appropriate error if necessary. | `{ identifier, password }` |
| `POST` | `/api/auth/oauth-sync` | Receives authenticated OAuth user information from NextAuth, creates a new user if needed, or links an existing account. | `{ email, name, avatar, provider, providerId }` |

---

#### 💻 Online Compiler

| Method | Endpoint | Description | Payload Expectation |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/online-compiler/execute-code` | Executes the submitted source code using the online compiler API and returns the compilation/execution result. | Compiler request payload |

---

#### 📚 Problem Management

| Method | Endpoint | Description | Payload Expectation |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/problem/ensure` | Ensures that a problem exists in the database. Creates it if it doesn't already exist and returns the stored problem document. | Problem details |
| `POST` | `/api/workspace/ensure` | Ensures that workspace exists in the database. Creates it if it doesn't already exist and returns the created workspace for the session user. | Workspace details |

---

### 🌐 Next.js Frontend API Routes (NextAuth)

These routes are automatically provided by **NextAuth** inside the Next.js application (`/api/auth/*`). They manage the complete OAuth authentication flow and **do not require custom controllers**.

#### 🔑 Google OAuth

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/auth/signin/google` | Redirects the user to Google's OAuth consent screen. |
| `GET` | `/api/auth/callback/google` | Handles Google's OAuth callback, validates the user, and creates the authenticated session. |

---

#### 🐙 GitHub OAuth

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/auth/signin/github` | Redirects the user to GitHub's OAuth authorization page. |
| `GET` | `/api/auth/callback/github` | Processes GitHub's OAuth callback and creates the authenticated session. |

---

### 🧭 Frontend Routes

These are the pages available in the Next.js frontend application.

#### 🌍 Public Routes

| Route | Description | Access |
| :--- | :--- | :--- |
| `/` | Landing page introducing Shine AI, its features, and platform overview. | Public |
| `/login` | Authentication page allowing users to sign in or sign up using email/username & password or OAuth (Google/GitHub). | Public |

---

#### 🔒 Protected Routes

| Route | Description | Access |
| :--- | :--- | :--- |
| `/dashboard` | User dashboard displaying personalized information and recent activity. | Protected |
| `/canvas` | Interactive coding workspace where users solve problems with AI assistance. | Protected |
| `/problems/new` | Interface for creating a new problem and opening it on the coding canvas. | Protected |

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