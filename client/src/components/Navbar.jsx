import {Link, useLocation, useNavigate} from "react-router-dom";
import { BiX, BiMenu } from "react-icons/bi";
import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";

const Navbar = () => {

    const navbarItems = [
        {
            id: 1,
            name: "Naslovna",
            link: ""
        },
        {
            id: 2,
            name: "Kultura",
            link: "/?tema=kultura"
        },
        {
            id: 3,
            name: "Sport",
            link: "/?tema=sport"
        },
        {
            id: 4,
            name: "Politika",
            link: "/?tema=politika"
        },
        {
            id: 5,
            name: "Svijet",
            link: "/?tema=svijet"
        },
        {
            id: 6,
            name: "Zabava",
            link: "/?tema=zabava"
        }
    ];

    const [toggle, setToggle] = useState(false);
    const {currentUser, logout} = useAuth();
    const path = useLocation().search.split('=')[1];
    const search = window.location.search;
    console.log("Path ",search)
    const navigate = useNavigate();

    const scrollOnTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <>
            <nav className="bg-red-700 hidden lg:flex items-center justify-between px-[2vw] border-b-2 border-red-900">
                <div className="flex items-center">
                    {
                        navbarItems.map((item, index) => {
                            const isActive = path === item.name.toLowerCase() || search === item.link || (item.name === "Naslovna" && search === "");
                            return (
                                <Link to={item.link}
                                      key={index}
                                      className={`min-w-[100px] h-full hover:bg-red-200 hover:text-red-700 border-x border-red-700 duration-500 text-center py-3  ${isActive ? 'bg-red-200 text-red-700' : 'text-red-100'}`}
                                      onClick={scrollOnTop}
                                >
                                    <h2 className="text-xl font-serif">{item.name}</h2>
                                </Link>
                            )
                        })
                    }
                    {currentUser && <Link to={`/novi-post`} className="px-8">
                        <h2 className="text-xl font-serif bg-red-100 rounded-full text-red-700 p-1 min-w-[8rem] border border-red-900 text-center">Novi
                            post</h2>
                    </Link>}
                </div>
                <p className="text-xl text-red-100 font-serif cursor-pointer" onClick={() => navigate(`/profil/${currentUser?.username}`)}>{currentUser?.username}</p>
                <Link to='/prijava' className="text-xl text-red-100 font-serif cursor-pointer hover:underline" onClick={currentUser ? logout : null}>
                    {currentUser ? 'Logout' : 'Login'}
                </Link>
            </nav>
    <nav className="flex justify-between lg:hidden items-end bg-red-700 p-2">
        <h1 className="text-2xl font-semibold text-red-100">Logo</h1>
        <p className="text-lg text-red-100 font-serif cursor-pointer" onClick={() => navigate(`/profil/${currentUser?.username}`)}>{currentUser?.username}</p>
        <div className="z-50">
            {toggle ? <BiX className="text-3xl text-red-100 cursor-pointer" onClick={() => setToggle(!toggle)}/> : <BiMenu className="text-3xl text-red-100 cursor-pointer" onClick={() => setToggle(!toggle)}/> }
        </div>
    </nav>

    <div className="relative">
                <div className={`absolute flex flex-col bg-red-700 text-center left-0 right-0 ${toggle ? 'translate-x-0 opacity-100' : '-translate-x-[100vw] opacity-0'} duration-1000 z-50`}>
                    <div className="flex flex-col items-center py-2 w-full">
                    {
                        navbarItems.map((item, index) => {
                            return (
                                <Link to={item.link} key={index} className="w-full py-4 hover:bg-red-100 text-red-100 hover:text-red-700 duration-500" onClick={() => {setToggle(false); scrollOnTop()} }>
                                    <h2 className="text-xl font-serif">{item.name}</h2>
                                </Link>
                            )
                        })
                    }
                    {currentUser &&
                        <Link to={`/novi-post`} className="py-4 text-xl font-serif bg-red-100 rounded-full w-fit text-red-700 border border-red-800 p-1" onClick={() => {setToggle(false); scrollOnTop()} }>
                        <h2 className="px-4">Novi post</h2>
                        </Link>
                    }
                    <Link to='/prijava'
                          className="text-xl text-red-100 font-serif cursor-pointer hover:underline py-4"
                          onClick={currentUser ? logout : null}
                    >
                        {currentUser ? 'Logout' : 'Login'}
                    </Link>
                </div>
                </div>
            </div>
            </>
    );
}

export default Navbar;