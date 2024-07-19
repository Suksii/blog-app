import express from "express";
import {addPost, deletePost, getPost, getPosts, updatePost, uploadImage} from "../controllers/post.js";
import multer from "multer";

const router = express.Router();
const photoUpload = multer({dest: 'uploads/'});


router.post('/upload',photoUpload.array('photos', 100), uploadImage)

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/add', addPost)
router.delete('/delete/:id', deletePost)
router.put('/update/:id', updatePost)


export default router;