import {Link, useLocation, useNavigate} from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Menu from "../components/Menu.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../context/AuthContext.jsx";
import { formatDistanceToNow} from "date-fns";

const SinglePage = () => {

    const [post, setPost] = useState({});
    const location = useLocation();
    const {currentUser} = useAuth();
    const navigate = useNavigate()

    const postId = location.pathname.split('/')[2];


    useEffect(() => {
        const fetchedData = async () => {
            try {
                const response = await axios.get(`/posts/${postId}`);
                console.log(response.data)
                setPost(response.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchedData();
    }, [postId])

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/delete/${postId}`);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }
    const postDate = new Date(post.date);

    return (
        <div className="w-full md:w-[80%] mx-auto flex flex-col md:flex-row gap-10 pt-10">
            <div style={{flex: 2}}>
                <div className="w-fit">
                <img src={'http://localhost:3001/uploads/' + post?.postImage} alt="" className="h-[500px] w-full"/>
                    <div className="flex gap-3">
                        <div className="w-full flex justify-between bg-red-100 p-2">
                            <div className="flex gap-2 items-center">
                                {post.userImage && <img src={'http://localhost:3001/uploads/' + post?.userImage}
                                                         alt={post.username}
                                                         className="w-12 h-12 rounded-full"/>}
                                <p className="text-md">{post.username}</p>
                            </div>
                            <p className="text-sm">{!isNaN(postDate)
                                ? formatDistanceToNow(postDate, {addSuffix: true}) : 'Invalid date'}</p>
                        </div>
                    </div>
                </div>
                {currentUser.username === post.username &&
                <div className="flex gap-5 text-2xl justify-evenly pb-10">
                    <Link to={`/novi-post?edit=${postId}`} state={post}>
                        <FaEdit className="text-gray-900"/>
                    </Link>
                    <FaTrashAlt className="text-red-700 cursor-pointer" onClick={handleDelete}/>
                </div>
                }
                <div className="p-10">
                    <h1 className="text-2xl">{post.postTitle}</h1>
                    <p className="text-xl text-justify leading-9 py-5" dangerouslySetInnerHTML={{ __html: post.description }}></p>
                </div>

            </div>
            <div style={{flex: 1}} className="px-4">
                <Menu category={post.category}/>
            </div>
        </div>
    );
}

export default SinglePage;