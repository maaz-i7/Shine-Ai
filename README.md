# ✨ Shine Ai

> Seek. Shine. Solve. Succeed.

Shine Ai is an AI-assisted coding workspace designed to reduce context switching while solving programming problems.

Instead of constantly switching between coding platforms and AI tools, users can solve problems, run code, create test cases, receive hints, debug solutions, and interact with an AI assistant—all within a single workspace.

Built to make problem solving faster, more focused, and more productive.

## 🚀 Live Demo

Experience Shine AI here:

🔗 **Live Application:** https://shine-ai-assistant.vercel.app/

> Sign in using Google or GitHub OAuth.

## ❔ Why I Built Shine Ai

While solving problems on platforms like LeetCode and Codeforces, I found myself repeatedly switching between:

- Coding platform
- ChatGPT / Gemini
- Notes
- Browser tabs

Every time I got stuck, I had to copy problem statements, explain context, paste code, and repeat information.

Shine Ai was built to eliminate this workflow and provide an integrated environment where the AI already understands the problem, code, and workspace context.

## ⭐ Features
### AI-Powered Assistance
- Context-aware AI assistant
- Debugging support
- Hint generation
- Edge case suggestions
- Complexity analysis
- Solution explanations

### Coding Workspace
- Monaco-powered code editor
- Multi-language code execution
- Custom test cases
- Execution console
- Workspace persistence

### Problem Management
- Create problems from screenshots
- OCR-based problem extraction
- Automatic problem formatting
- Workspace generation

### User Experience
- Google & GitHub OAuth
- Dashboard for tracking workspaces
- Responsive interface
- Real-time autosave

## 🛠️ Architecture

```text
                 ┌────────────────────┐
                 │     Frontend       │
                 │      Next.js       │
                 └─────────┬──────────┘
                           │ HTTP/REST
                           ▼
                 ┌────────────────────┐
                 │   Backend API      │
                 │    Express.js      │
                 └───┬──────┬───────┬─┘
                     │      |       │
        ┌────────────┘      |       └────────────────┐
        ▼                   ▼                        ▼
┌────────────────┐    ┌────────────────┐      ┌────────────────┐
│    MongoDB     │    │  Compiler API  │      |    Gemini AI   │
│   Database     │    |                |      │      API       │
└────────────────┘    └────────────────┘      └────────────────┘
```

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
| `GET` | `/api/workspace/:problemId` | Fetch session user's workspace for a specific problem. |
| `PATCH` | `/api/workspace/:workspaceId` | checks and saves user code and test cases regularly. |
| `DELETE` | `/api/workspace/:workspaceId` | deletes the workspace of the user. |
| `GET` | `/api/workspace/all` | Fetch all workspaces belonging to the session user. |
| `POST` | `api/workspace/ai-code/:problemId` | Generate and save AI-generated starter code for the specified problem. |
| `GET` |  `/api/assistant/workspace/:workspaceId` | Load existing chat messages.
| `POST` |  `/api/assistant/workspace/:workspaceId/chat` | Send a message and receive the AI response.
| `POST` |  `/api/assistant/workspace/:workspaceId/quick-help` | Gets AI response for quick help functions
| `POST` |  `/api/assistant/workspace/:workspaceId/new-language-runner-code` | gets AI generated runner code for the new code language

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

## 🛠️ Tech Stack

### Frontend
- **Next.js** – Full-stack React framework
- **React** – Component-based UI development
- **Tailwind CSS** – Utility-first styling
- **Zustand** – Global state management
- **Monaco Editor** – Browser-based code editor
- **React Hook Form** – Form handling and validation

### Backend
- **Node.js** – JavaScript runtime
- **Express.js** – REST API development

### Database
- **MongoDB** – NoSQL database
- **Mongoose** – Object data modeling (ODM)

### AI & Problem Processing
- **Google Gemini API** – AI-powered assistance and problem analysis
- **Multer** – Image upload handling
- **OCR Pipeline** – Problem extraction from screenshots

### Authentication & Security
- **NextAuth.js** – Authentication and session management
- **Google OAuth** – Social authentication
- **GitHub OAuth** – Social authentication
- **JWT** – Secure authorization
- **bcrypt** – Password hashing
- **Helmet** – Security hardening
- **CORS** – Cross-origin request management

### Developer Experience
- **React Markdown** – Markdown rendering
- **KaTeX** – Mathematical expression rendering
- **Morgan** – Request logging
- **dotenv** – Environment configuration

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/maaz-i7/Shine-Ai
cd Shine-Ai
```

### Install Dependencies

```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

### Configure Environment Variables

Create `.env.local` file in the client directory and add the required credentials:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Create `.env` file in the server directory and add the required credentials:

```env
PORT=5000
MONGO_URI=
NODE_ENV=development
CLIENT_URL=http://localhost:3000
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CODE_EXECUTION_API_URL=https://api.onlinecompiler.io/api/run-code-sync/
CODE_EXECUTION_API_KEY=
GEMINI_API_KEY=
```

### Run the Application

```bash
# Client
npm run dev

# Server
npm run dev
```

## 🚧 Future Improvements

- Better AI context management
- Contest mode
- Support for additional programming languages
- Collaborative workspaces
- Submission analytics
- Personalized learning insights
- Improved code execution infrastructure
- Profile Analytics
- More refined and modern UI