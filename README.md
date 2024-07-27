# Blog App Project

## Overview
This project is a full-stack blog application developed using React for the frontend and Node.js with Express for the backend. The database used is MySQL. The application allows users to create, read, update, and delete blog posts.

## Technologies Used

### Frontend
- **React**
- **JavaScript**
- **TailwindCSS**
- **React Router Dom**

### Backend
- **Node.js**
- **Express**
- **MySQL**

### Libraries and Tools
- **axios**
- **multer**
- **cookie-parser**
- **dotenv**
- **cors**
- **jsonwebtoken (jwt)**
- **bcrypt**

## Frontend Implementation

### Hooks
- **useState**
- **useEffect**
- **useContext**
- **useRef**

### React Router Dom
- **useLocation** (search, pathname)
- **useNavigate**
- **Outlet**
- **Routes**
- **Route**
- **BrowserRouter**

### Axios
- **axios.defaults.withCredentials**
- **axios.defaults.baseURL**
- **axios.post**
- **axios.get**
- **axios.put**
- **axios.delete**

### JavaScript Methods and Properties
- **async, await**
- **append**
- **map**
- **new FormData()**
- **e.preventDefault()**
- **length**
- **e.target.name**
- **e.target.value**
- **e.target.files**
- **split**
- **window.location.search**
- **window.scrollTo()**
- **toLowerCase()**
- **replace**

## Backend Implementation

### Express Middleware
- **express**
- **multer**
- **cookieParser**
- **dotenv.config**
- **cors**

### Node.js Core Modules
- **fileURLToPath**
- **dirname**
- **fs**

### Authentication and Encryption
- **jsonwebtoken (jwt)**
- **bcrypt**

### Database
- **db.query**

## Project Structure

### Frontend
The frontend is developed using React, with state management handled using hooks like useState and useEffect. Routing is managed using React Router Dom, which allows for navigation between different components and pages. Axios is used for making HTTP requests to the backend.

### Backend
The backend is built with Node.js and Express. Middleware like multer is used for handling file uploads, and cookieParser for parsing cookies. Environment variables are managed using dotenv. CORS is enabled to allow cross-origin requests. JSON Web Tokens (JWT) and bcrypt are used for authentication and password encryption, respectively. Database queries are executed using MySQL.

## Functionality

### User Authentication
- Registration and login functionality.
- Password encryption using bcrypt.
- JWT for session management.

### Blog Post Management
- CRUD operations for blog posts.
- File uploads handled by multer.
- Secure HTTP requests with axios.
