import {useState, useEffect} from "react";
import axios from "axios";

const Menu = ({category}) => {
    const [posts, setPosts] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const fetchedData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3001/api/posts/?category=${category}`)
                setPosts(response.data);
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false);
            }
        }
        fetchedData();
    },[category])

    return (
        <div>
            <h1 className="text-3xl font-serif py-5">Još sličnih vijesti</h1>
            <div className="flex flex-col">
                {
                    posts.map((post) => {
                        return (
                            <div key={post.id} className={`flex gap-5 px-2 py-5 items-center hover:bg-blue-200 rounded-md duration-200 cursor-pointer`}>
                                <img src={post.photo} alt={post.title} className="w-[100px] h-[100px] object-cover rounded-lg"/>
                                <div>
                                    <h1 className="text-xl">{post.title}</h1>
                                    <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}

export default Menu;