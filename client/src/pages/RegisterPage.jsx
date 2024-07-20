import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {ButtonLoading} from "../components/Loading.jsx";

const Register = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        image: ""
    })
    const [error, setError] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try{
            if(formData.password.length < 6){
                setPasswordMessage('Šifra mora imati najmanje 6 karaktera')
                setTimeout(() => {
                    setPasswordMessage('')
                }, 2000)
                return
            }
            const response = await axios.post('http://localhost:3001/api/auth/register', formData)
            if(response.status === 200)
                navigate('/prijava')
        } catch (err) {
            setError(err.response.data)
            setTimeout(() => {
                setError('')
            }, 2000)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center h-[100vh] bg-blue-100">
            <div className="w-[70%] md:w-[30vw] min-w-[22rem] mx-auto border pt-10 bg-white rounded-lg shadow-2xl shadow-gray-300">
                <h1 className="text-4xl text-center font-serif text-blue-900">Registracija</h1>
                <div className="py-5">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col py-3 px-5">
                            <input type="text"
                                   placeholder="Korisničko ime"
                                   className="p-1 border-b-2 border-blue-300 text-lg outline-none"
                                   name="username"
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col py-3 px-5">
                            <input type="email"
                                   placeholder="Email"
                                   className="p-1 border-b-2 border-blue-300 text-lg outline-none"
                                   name="email"
                                   onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col py-3 px-5 relative">
                            <input type="password"
                                   placeholder="Lozinka"
                                   className="p-1 border-b-2 border-blue-300 text-lg outline-none"
                                   name="password"
                                   onChange={handleChange}
                            />

                        </div>
                        <div className="flex flex-col py-8 px-5">
                            <button type="submit" className="py-3 px-2 text-center flex justify-center border border-blue-800 rounded-full uppercase text-lg text-white bg-blue-800 tracking-wider">{loading ? <ButtonLoading/> : 'Registruj se'}</button>
                        </div>
                        {passwordMessage && <div className="flex justify-center text-red-500">{passwordMessage}</div>}
                        {error && <div className="flex justify-center text-red-500">{error}</div>}
                    </form>
                    <span className="flex justify-center pt-10 gap-1">Već imate nalog?
                        <Link to="/prijava" className="underline text-blue-600">Prijavite se!</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Register