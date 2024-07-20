import {useState, useRef} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {format} from "date-fns";
import {Loading} from "../components/Loading.jsx";

const WritePage = () => {

    const state = useLocation().state;

    const postID = state ? useLocation().search.split('=')[1] : null;
    console.log(postID)
    const [title, setTitle] = useState(state?.postTitle || '');
    const [category, setCategory] = useState(state?.category || '');
    const [description, setDescription] = useState(state?.description || '');
    const [image, setImage] = useState(state?.postImage || '');
    const imgRef = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const categories = [
        {
            id: 1,
            name: "Kultura",
            value: "kultura"
        },
        {
            id: 2,
            name: "Sport",
            value: "sport"
        },
        {
            id: 3,
            name: "Politika",
            value: "politika"
        },
        {
            id: 4,
            name: "Svijet",
            value: "svijet"
        },
        {
            id: 5,
            name: "Zabava",
            value: "zabava"
        },
    ];

    const changeImage = async () => {
        const file = imgRef.current.files[0];
        const data = new FormData();
        data.append('photos', file);
        setImageLoading(true);
        try {
            const response = await axios.post("/posts/upload", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})

            const {data: filename} = response;
            setImage(filename[0]);
        } catch (err) {
            console.log(err);
        } finally {
            setImageLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            title,
            description,
            category,
            image,
            date: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        };
        setLoading(true);
        try {
            if (state) {
                await axios.put(`/posts/update/${postID}`, postData);
            } else {
                await axios.post(`/posts/add`, postData);
            }
            navigate('/');
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (<Loading/>)

    return (
        <div className="w-[90%] md:w-[85%] mx-auto my-10 flex gap-4 flex-col md:flex-row">
            <div style={{flex: 3}} className="w-full">
                <input className="border border-gray-300 w-full p-2 mb-3 outline-none"
                       placeholder="Title"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}/>
                <ReactQuill theme="snow"
                            value={description}
                            onChange={setDescription}
                            className="h-[40rem] overflow-scroll border border-gray-300"/>
            </div>
            <div style={{flex: 1}} className="flex flex-col gap-4">
                <div className="border border-gray-300 p-3 gap-2 h-full flex flex-col justify-between" style={{flex: 1}}>
                    {image ? <img src={`http://localhost:3001/uploads/${image}`} alt="image" className="w-full object-cover"/> : <div className="w-full h-[300px] bg-gray-300"/>}
                        <div className="w-full font-serif bg-red-800 rounded-full text-red-100 border p-1 min-w-[8rem] text-center cursor-pointer" onClick={() => imgRef.current.click()}>
                                <p>{imageLoading ? 'Uploading...' : state ? 'Promijeni sliku' : 'Postavi sliku'}</p>
                            <input type="file" ref={imgRef} className="hidden" onChange={changeImage}/>
                        </div>
                </div>
                <div className="border border-gray-300 p-3 h-full" style={{flex: 1}}>
                    <h1 className="text-xl font-semibold mb-2">Kategorije</h1>
                    <ul>
                        {
                            categories.map((cat) => {
                                return (
                                    <li key={cat.id} className="flex gap-2">
                                        <input type="checkbox"
                                               value={cat.value}
                                               checked={category === cat.value}
                                               id={cat.id}
                                               onChange={(e) => setCategory(e.target.value)}/>
                                        <label htmlFor={cat.id}>{cat.name}</label>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <button className="w-full font-serif bg-red-800 rounded-full text-red-100 border p-1 min-w-[8rem] text-center" onClick={handleSubmit}>Sačuvaj</button>
            </div>
        </div>
    );
}

export default WritePage;