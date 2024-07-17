import {useState, useRef} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import {useLocation} from "react-router-dom";
import {format} from "date-fns";

const WritePage = () => {

    const state = useLocation().state;
    const [title, setTitle] = useState(state?.title || '');
    const [category, setCategory] = useState(state?.category || '');
    const [description, setDescription] = useState(state?.description || '');
    const [image, setImage] = useState(null);
    const imgRef = useRef(null)

    const categories = [
        {
            id: 1,
            name: "Kultura",
            value: "kultura"
        },
        {
            id: 2,
            name: "Društvo",
            value: "drustvo"
        },
        {
            id: 3,
            name: "Politika",
            value: "politika"
        },
        {
            id: 4,
            name: "Evropska unija",
            value: "evropska-unija"
        },
        {
            id: 5,
            name: "Intervju",
            value: "intervju"
        },
        {
            id: 6,
            name: "Ekologija",
            value: "ekologija"
        },
        {
            id: 7,
            name: "Projekti",
            value: "projekti"
        }
    ];

    const changeImage = () => {
        const file = imgRef.current.files[0];
        const data = new FormData();
        data.append('photos', file);
        axios.post("http://localhost:3001/api/posts/upload", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            const {data: filename} = response;
            setImage(filename[0]);
        }).catch(error => {
            console.log(error);
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            title,
            description: description.toString(),
            category,
            image: image,
            date: format(new Date(), 'dd-MM-yyyy HH:mm:ss')
        };

        try {
            if (state) {
                await axios.put(`http://localhost:3001/api/posts/${state.id}`, postData);
            } else {
                await axios.post(`http://localhost:3001/api/posts/add`, postData);
            }
        } catch (err) {
            console.log(err);
        }
    };

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
                    <h1 className="text-xl font-semibold mb-2">Postavi</h1>
                        <div className="cursor-pointer font-serif bg-blue-800 rounded-full text-blue-300 border p-1 min-w-[8rem] text-center" onClick={() => imgRef.current.click()}>
                            <p>Postavi sliku</p>
                            <input type="file" ref={imgRef} className="hidden" onChange={changeImage}/>
                        </div>
                    <div className="flex justify-between">
                        <button className="w-full font-serif bg-blue-800 rounded-full text-blue-300 border p-1 min-w-[8rem] text-center" onClick={handleSubmit}>Sačuvaj</button>
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
            </div>
        </div>
    );
}

export default WritePage;