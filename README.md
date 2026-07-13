# ✨ Shine AI

> **Seek. Shine. Solve. Succeed**
>
> Shine AI is an AI-powered platform that helps users learn, solve problems, and share knowledge through an intuitive and modern interface.

---

## 🔗 API Routes

---

### 🖥️ Express Backend Routes (Database Operations)

These routes are defined in `server/src/routes/auth.routes.js` and handled by the Express backend. They securely transmit sensitive data via the request body using the `POST` method.

| Method | Endpoint | Description | Payload Expectation |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Registers a new local user, hashes the password, and saves the document to MongoDB. | `{ name, username, email, password }` |
| `POST` | `/api/auth/login` | Validates email/username and password. Resolves OAuth provider conflicts (e.g., returns 401 if they previously used Google). | `{ identifier, password }` |
| `POST` | `/api/auth/oauth-sync`| Receives OAuth profile data from NextAuth. Creates a new user or links to an existing account. | `{ email, name, avatar, provider, providerId }` |

---

### 🌐 Next.js Frontend Routes (NextAuth Built-in)

These routes are automatically generated and managed by NextAuth inside the Next.js application at `http://localhost:3000/api/auth/*`. **You do not need to write controllers for these endpoints.**

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/auth/signin/google` | NextAuth endpoint to redirect the user to the Google consent screen. |
| `GET` | `/api/auth/callback/google` | Google redirects here with the authorization code. NextAuth intercepts it. |
| `GET` | `/api/auth/signin/github` | NextAuth endpoint to redirect the user to the GitHub authorization screen. |
| `GET` | `/api/auth/callback/github` | GitHub redirects here. NextAuth intercepts and processes the profile. |
| `POST` | `/api/auth/signout` | Destroys the secure JWT session cookie in the user's browser. |

---

## 🔗 Frontend Routes

| Route           | Description                                                                 | Access    |
| --------------- | --------------------------------------------------------------------------- | --------- |
| `/`             | Landing page introducing Shine AI and its features.                         | Public    |
| `/login`        | Sign in or Sign up using email/username & password or OAuth (Google/GitHub).           | Public    |
| `/dashboard`    | User dashboard displaying personalized content and recent activity.         | Protected |


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