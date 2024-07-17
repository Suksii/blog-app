import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const HomePage = () => {

    const [posts, setPosts] = useState([]);
    const [loading,setLoading] = useState(false);
    const category = useLocation().search;


    useEffect(() => {
        const fetchedData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3001/api/posts/${category}`)
                console.log(response.data)
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
        <div className="w-[80%] mx-auto">
            <div className="mt-10 flex flex-col">
                {
                    posts.map((post) => {
                        return (
                            <div key={post.id} className="flex reverse">
                                <div style={{flex: 1}}>
                                    <img src={'http://localhost:3001/uploads/' + post.image} alt={post.title} className="w-full object-cover max-h-[300px]"/>
                                </div>
                                <div style={{flex: 2}}>
                                    <Link to={`/vijest/${post.id}`} className="flex flex-col h-full justify-between items-center px-[5vw] py-5">
                                        <h1 className="text-3xl font-semibold">{post.title}</h1>
                                        <p className="text-xl" dangerouslySetInnerHTML={{ __html: post.description }}></p>
                                        <button>Pročitaj još...</button>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default HomePage;