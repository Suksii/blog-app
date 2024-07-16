import express from "express";
import {addPost, deletePost, getPost, getPosts, updatePost, uploadImage} from "../controllers/post.js";
import multer from "multer";

const router = express.Router();


const photoUpload = multer({dest: 'uploads/'});

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/add', addPost)
router.post('/upload',photoUpload.array('photos', 100), uploadImage)
router.delete('/:id', deletePost)
router.put('/', updatePost)


export default router;