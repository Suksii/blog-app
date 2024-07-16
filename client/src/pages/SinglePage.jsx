import {Link, useLocation, useNavigate} from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Menu from "../components/Menu.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import moment from 'moment';
import {useAuth} from "../context/AuthContext.jsx";

const SinglePage = () => {

    const [post, setPost] = useState({});
    const location = useLocation();
    const {currentUser} = useAuth();
    const navigate = useNavigate()

    const postId = location.pathname.split('/')[2];


    useEffect(() => {
        const fetchedData = async () => {
            try {
                console.log(postId)
                const response = await axios.get(`http://localhost:3001/api/posts/${postId}`);
                setPost(response.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchedData();
    },[postId])

    const handleDelete = async () => {
        try{
            await axios.delete(`http://localhost:3001/api/posts/${postId}`);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex gap-10 px-[6vw] pt-10">
            <div style={{flex: 2}}>
                <img src={post.postImage} alt=""/>
                <div className="px-10">
                    <div className="flex gap-3">
                        {post.userImage && <img src={post.userImage} alt={post.username}/>}
                        <p className="text-lg">{post.username}</p>
                    </div>
                    <p>{moment(post.date).fromNow()}</p>
                </div>
                {currentUser.user === post.username &&
                <div className="flex gap-5 text-2xl justify-evenly pb-10">
                    <Link to={`/novi-post?edit=${postId}`} state={post}>
                        <FaEdit className="text-gray-900"/>
                    </Link>
                    <FaTrashAlt className="text-red-700 cursor-pointer" onClick={handleDelete}/>
                </div>
                }
                <h1 className="text-4xl font-serif py-5">{post.title}</h1>
                <p className="text-xl text-justify leading-9 py-5">{post.description}</p>
            </div>
            <div style={{flex: 1}}>
                <Menu category={post.category}/>
            </div>
        </div>
    );
}

export default SinglePage;