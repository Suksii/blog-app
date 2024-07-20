import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ButtonLoading, Loading} from "./Loading.jsx";

const Menu = ({category}) => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchedData = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`/posts/?category=${category}`)
                setPosts(response.data);
            }
            catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchedData();
    },[category])

    if(loading) return (<Loading />)

    return (
        <>
            <h1 className="text-2xl font-serif py-5">Još sličnih vijesti</h1>
            <div className="flex flex-col gap-2">
                {
                    posts.map((post) => {
                        return (
                            <div key={post.id}
                                 className={`flex gap-5 px-2 bg-gray-100 h-[120px] hover:bg-gray-200 rounded-md duration-200 cursor-pointer`}
                                 onClick={() => navigate(`/vijest/${post.id}`)}>
                                <img src={'http://localhost:3001/uploads/' + post.image} alt={post.title} className="w-[180px] object-cover rounded-lg"/>
                                <div className="flex flex-col items-start">
                                    <h1 className="text-lg font-semibold line-clamp-1 w-full">{post.title}</h1>
                                    <p className="text-sm line-clamp-4" dangerouslySetInnerHTML={{ __html: post.description }}></p>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    );
}

export default Menu;