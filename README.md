# ResuMeUp

**Live Demo:** [resu-me-up-website.vercel.app](https://resu-me-up-website.vercel.app/)
**Repository:** [Sneha-Nahak/ResuMeUp_Website](https://github.com/Sneha-Nahak/ResuMeUp_Website)

ResuMeUp is a full-stack web application that lets users build, customize, and manage professional resumes through an intuitive, template-driven interface.

## Features

- **User Authentication** — Register/login with protected routes on both client and server
- **Resume Builder** — Guided resume creation and editing
- **Templates** — Browse and apply resume templates
- **Dashboard** — Manage saved resumes in one place
- **Career Resources** — Career tips, FAQ, and blog pages for users
- **Responsive UI** — Navbar/Footer layout with protected route handling

## Tech Stack

**Frontend**
- React (Vite)
- React Router (`ProtectedRoute.jsx`)
- Context API for state management (`UserContext`, `ResumeContext`)
- CSS (App.css / index.css)

**Backend**
- Node.js
- Express.js
- JWT-based auth middleware

**Database**
- MongoDB (Mongoose models for `User` and `Resume`)

**Deployment**
- Vercel (Frontend)
- *(Add backend hosting provider, e.g., Render/Railway)*

## Project Structure

```
ResuMeUp_Website/
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection setup
│   ├── controllers/
│   │   ├── resume.controller.js     # Resume CRUD logic
│   │   └── user.controller.js       # Auth & user logic
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT verification
│   ├── models/
│   │   ├── resume.model.js          # Resume schema
│   │   └── user.model.js            # User schema
│   ├── routes/
│   │   ├── resume.route.js
│   │   └── user.route.js
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── Footer.jsx
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   ├── ResumeContext.jsx
    │   │   └── UserContext.jsx
    │   ├── pages/
    │   │   ├── Blog.jsx
    │   │   ├── CareerTips.jsx
    │   │   ├── ContactUs.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── FAQ.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── PrivacyAndPolicy.jsx
    │   │   ├── Register.jsx
    │   │   ├── ResumeBuilder.jsx
    │   │   ├── Templates.jsx
    │   │   └── TermsOfService.jsx
    │   ├── styles/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Sneha-Nahak/ResuMeUp_Website.git
   cd ResuMeUp_Website
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables

   Create a `.env` file in `backend/`:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```

   Create a `.env` file in `frontend/`:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

5. Run the development servers

   Backend:
   ```bash
   cd backend
   npm start
   ```

   Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. Open the URL shown in your terminal (default Vite port: [http://localhost:5173](http://localhost:5173))

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Log in a user |
| GET | `/api/users/me` | Get logged-in user profile *(protected)* |
| GET | `/api/resumes` | Get all resumes for logged-in user *(protected)* |
| POST | `/api/resumes` | Create a new resume *(protected)* |
| PUT | `/api/resumes/:id` | Update an existing resume *(protected)* |
| DELETE | `/api/resumes/:id` | Delete a resume *(protected)* |

*(Update this table to match your exact route names in `user.route.js` / `resume.route.js`.)*

## Pages

| Page | Description |
|------|-------------|
| Home | Landing page |
| Login / Register | Authentication |
| Dashboard | User's saved resumes |
| ResumeBuilder | Core resume creation/editing flow |
| Templates | Browse resume templates |
| CareerTips / Blog / FAQ | Career resource content |
| ContactUs | Contact form |
| PrivacyAndPolicy / TermsOfService | Legal pages |

## Roadmap

- [ ] Add more resume templates
- [ ] AI-assisted content suggestions
- [ ] PDF export
- [ ] LinkedIn import

## Author

**Sneha Nahak**
Fullstack/MERN Stack Developer | UI/UX Designer

## License

This project is licensed under the MIT License.
