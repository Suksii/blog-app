import {Link} from "react-router-dom";
import { BiX, BiMenu } from "react-icons/bi";
import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";

const Navbar = () => {

    const navbarItems = [
        {
            id: 1,
            name: "Kultura",
            link: "/?tema=kultura"
        },
        {
            id: 2,
            name: "Društvo",
            link: "/?tema=drustvo"
        },
        {
            id: 3,
            name: "Politika",
            link: "/?tema=politika"
        },
        {
            id: 4,
            name: "EU",
            link: "/?tema=evropska-unija"
        },
        {
            id: 5,
            name: "Intervju",
            link: "/?tema=intervju"
        },
        {
            id: 6,
            name: "Ekologija",
            link: "/?tema=ekologija"
        },
        {
            id: 7,
            name: "Projekti",
            link: "/?tema=projekti"
        }
    ];

    const [toggle, setToggle] = useState(false);
    const {currentUser, logout} = useAuth();

    return (
        <>
            <nav className="bg-blue-100 hidden md:flex items-center justify-between px-[2vw] border-b-2 border-blue-500 py-3">
                <div className="flex md:gap-[2vw] lg:gap-[4vw] items-center">
                    {
                        navbarItems.map((item, index) => {
                            return (
                                <Link to={item.link} key={index}>
                                    <h2 className="lg:text-md xl:text-xl text-blue-500 font-serif">{item.name}</h2>
                                </Link>
                            )
                        })
                    }
                    {currentUser && <Link to={`/novi-post`}>
                        <h2 className="lg:text-md xl:text-xl font-serif bg-blue-800 rounded-full text-blue-300 border p-1 min-w-[8rem] text-center">Novi
                            post</h2>
                    </Link>}
                </div>
                <p className="lg:text-md xl:text-xl text-blue-500 font-serif">{currentUser?.username}</p>
                {currentUser ?
                    <Link to='/' className="lg:text-md xl:text-xl text-blue-500 font-serif cursor-pointer hover:underline"
                       onClick={logout}>Logout
                    </Link>
                    :
                    <Link to="/prijava">
                        <p className="lg:text-md xl:text-xl text-blue-500 font-serif cursor-pointer hover:underline">Login</p>
                    </Link>}
            </nav>
            <nav className={`bg-blue-200 md:hidden flex items-center justify-between px-[2vw] border-b-2 border-blue-500 relative`}>
                <h2 className="text-[3rem] text-gray-500 font-serif cursor-pointer">Logo</h2>
                <div className="cursor-pointer text-3xl text-blue-500 hover:text-blue-900 duration-500" onClick={() => setToggle(prev => !prev)}>
                    {toggle ? <BiX/> : <BiMenu/>}
                </div>
            </nav>
            <div className={`md:hidden flex flex-col bg-blue-200 gap-7 z-30 absolute right-0 py-7 items-center justify-center border-b-2 border-gray-500 ${toggle ? 'w-full' : 'w-0 translate-x-[50px]'} cursor-pointer transition-all duration-300`}>
                {
                    navbarItems.map(item => {
                        return (
                            <Link to={item.link} key={item.id} onClick={() => setToggle(false)}>
                                <div className="text-blue-500 text-xl hover:text-blue-900 duration-300 uppercase font-semibold">{item.name}</div>
                            </Link>
                        )
                    })
                }
                <Link to={`/novi-post`} onClick={() => setToggle(false)}>
                    <h2 className="text-xl font-serif bg-blue-800 rounded-full text-blue-300 border p-2 min-w-[10rem] text-center uppercase">Novi post</h2>
                </Link>
                {currentUser ?
                    <Link to='/' className="text-2xl text-blue-500 font-serif cursor-pointer hover:underline"
                       onClick={logout}>Logout
                    </Link>
                    :
                    <Link to="/prijava">
                        <p className="text-2xl text-blue-500 font-serif cursor-pointer hover:underline">Login</p>
                    </Link>}
            </div>
        </>
    );
}

export default Navbar;