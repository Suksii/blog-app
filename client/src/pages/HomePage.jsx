import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const HomePage = () => {

    const [posts, setPosts] = useState([]);
    const category = useLocation().search.replace('tema', 'category')
    console.log(category)


    useEffect(() => {
        const fetchedData = async () => {
            try {
                const response = await axios.get(`/posts/${category}`)
                console.log(response.data)
                setPosts(response.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchedData();
    },[category])


    return (
        <div className="w-full md:w-[80%] mx-auto">
            <div className="my-10 flex flex-col">
                {
                    posts.length > 0 ? posts.map((post) => {
                        return (
                            <div key={post.id} className="flex reverse h-[350px]">
                                <div style={{flex: 1}}>
                                    <img src={'http://localhost:3001/uploads/' + post.image} alt={post.title} className="w-full h-full object-cover"/>
                                </div>
                                <div style={{flex: 2}} className="p-4 h-full">
                                    <Link to={`/vijest/${post.id}`} className="flex gap-2 items-start mb-4">
                                        <h1 className="text-3xl font-semibold line-clamp-2">{post.title}</h1>
                                        <p className="px-4 py-2 text-center min-w-[100px] rounded-full bg-red-100 text-red-500 uppercase tracking-wider font-semibold text-sm">{post.category}</p>
                                    </Link>
                                    <p className="text-xl line-clamp-[8]" dangerouslySetInnerHTML={{ __html: post.description }}></p>
                                </div>
                            </div>
                        )
                    })
                    : <p className="text-xl">Trenutno nema vijesti u ovoj kategoriji...</p>
                }
            </div>
        </div>
    );
}

export default HomePage;