import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();
    const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await login(formData)
            navigate('/')
        } catch (err) {
            setError(err.response.data)
            console.log(err.response)
            setTimeout(() => {
                setError('')
            }, 2000)
        }
    }

    return (
        <div className="flex items-center justify-center h-[100vh] bg-blue-100">
            <div className="w-[70%] md:w-[30vw] min-w-[22rem] mx-auto border pt-10 bg-white rounded-lg shadow-2xl shadow-gray-300">
                <h1 className="text-4xl text-center font-serif text-blue-900">Prijava</h1>
                <div className="py-5">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col py-3 px-5">
                            <input type="email"
                                   placeholder="Email"
                                   name="email"
                                   className="p-1 border-b-2 border-blue-300 text-lg outline-none"
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col py-3 px-5 relative">
                            <input type="password"
                                   placeholder="Lozinka"
                                   name="password"
                                   className="p-1 border-b-2 border-blue-300 text-lg outline-none"
                                   onChange={handleChange}
                            />

                        </div>
                        <div className="flex flex-col py-8 px-5">
                            <button type="submit" className="py-3 px-2 border border-blue-800 rounded-full uppercase text-lg text-white bg-blue-800 tracking-wider">Prijavi se</button>
                        </div>
                        {error && <div className="text-red-600 text-center">{error}</div>}
                    </form>
                    <span className="flex justify-center pt-10 gap-1">Nemate nalog?
                        <Link to="/registracija" className="underline text-blue-600">Registrujte se!</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Login