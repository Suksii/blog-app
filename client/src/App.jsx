import HomePage from "./pages/HomePage.jsx";
import {Outlet, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SinglePage from "./pages/SinglePage.jsx";
import WritePage from "./pages/WritePage.jsx";
import Navbar from "./components/Navbar.jsx";
import Register from "./pages/RegisterPage.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import axios from "axios";
function App() {

    const {currentUser} = useAuth();

    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = 'http://localhost:3001/api';

  return (
    <div>
        <Routes>
            <Route path="/" element={
                <div>
                    <Navbar/>
                    <Outlet/>
                </div>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/vijest/:id" element={<SinglePage/>}/>
                {currentUser && <Route path="/novi-post" element={<WritePage/>}/>}
            </Route>
            <Route path="/prijava" element={<LoginPage/>}/>
            <Route path="/registracija" element={<Register/>}/>
        </Routes>
    </div>

  )
}

export default App
