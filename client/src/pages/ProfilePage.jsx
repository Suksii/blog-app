import React, {useRef, useState} from 'react';
import {useAuth} from "../context/AuthContext.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ButtonLoading, Loading} from "../components/Loading.jsx";

const ProfilePage = () => {

    const imgRef = useRef(null)
    const {currentUser, setCurrentUser} = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    console.log(currentUser)
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('photos', file);
        setImageLoading(true)
        try {
            const response = await axios.post("/posts/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const {data: filename} = response;
            if (filename && filename.length > 0) {
                setCurrentUser(prevUser => ({
                    ...prevUser,
                    image: filename[0]
                }));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setImageLoading(false)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: currentUser.username,
            email: currentUser.email,
            image: currentUser.image
        }
        setLoading(true)
        try {
            await axios.put(`/users/update/${currentUser.id}`, user);
            navigate('/')
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    if(loading) return (<Loading/>)

    return (
        <div className="h-[100vh] w-full flex justify-center items-center">
            <div className="max-w-2xl w-full p-5 bg-red-100 rounded-md">
                <h1 className="text-center">Profil</h1>
                <div className="flex flex-col items-center">
                        <img
                        src={`http://localhost:3001/uploads/${currentUser.image}` || "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"}
                        alt="profile"
                        className="w-32 h-32 rounded-full object-cover my-2"/>
                    <div className="py-2 mb-4 min-w-[200px] flex justify-center text-center bg-red-700 w-fit text-red-100 rounded-md cursor-pointer" onClick={() => imgRef.current.click()}>
                        <p>{imageLoading ? <ButtonLoading /> : 'Promijeni sliku'}</p>
                        <input type="file" ref={imgRef} className="hidden" onChange={handleImageChange}/>
                    </div>
                    <div className={`flex flex-col gap-4 w-full`}>
                        <input value={currentUser.email}
                               className="py-2 w-full px-3"
                               disabled={true}/>
                        <input value={currentUser.username}
                               className="py-2 w-full px-3"
                               onChange={(e) => setCurrentUser(prevUser => ({
                                      ...prevUser,
                                        username: e.target.value}))}
                        />
                    </div>
                    <button className="w-full py-2 px-3 bg-red-700 text-red-100 rounded-md cursor-pointer mt-4" onClick={handleSubmit}>Sačuvaj</button>
                </div>


            </div>
        </div>
    );
};

export default ProfilePage;