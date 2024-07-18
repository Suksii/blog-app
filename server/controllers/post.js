import {db} from '../db.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
export const getPosts = (req, res) => {
    const query = req.query.category ? "SELECT * FROM posts WHERE category = ?" : "SELECT * FROM posts";
    db.query(query, [req.query.category], (err, result) => {
        if(err)
            return res.status(500).json(err)
        return res.status(202).json(result)
    })
}

export const uploadImage = (req, res) => {
    const {path, originalname} = req.files[0];
    const extension = originalname.split('.').pop();
    const newPath = path + '.' + extension;
    fs.renameSync(path, newPath);
    res.send(newPath.split(`\\`).slice(1));
}

export const getPost = (req, res) => {
    const sql = "SELECT p.id `username`, `description`, p.image AS postImage, p.title AS postTitle, u.id AS userID, u.image AS userImage, u.username, `category`, `date` FROM user u JOIN posts p ON u.id=p.uid WHERE p.id = ?"
     db.query(sql, [req.params.id], (err, result) => {
         if(err)
             return res.status(500).json(err)
         return res.status(202).json(result[0])
     })
}
export const addPost = (req, res) => {

    const token = req.cookies.accessToken
    if(!token) return res.status(403).json("Nemate ovlašćenje!");

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) return res.status(403).json('Nemate ovlašćenje!');

        const sql = "INSERT INTO posts(`title`, `description`, `image`, `category`,`date`,`uid`) VALUES (?)"

        const values = [req.body.title, req.body.description, req.body.image, req.body.category, req.body.date, user.id]

        db.query(sql, [values], (err, result) => {
            if(err) return res.status(500).json('Greška pri dodavanju posta: ' + err)
            return res.json("Vaš post je uspješno dodat!");
        })
    })
}
export const deletePost = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token)
        return res.status(401).json('Nemate ovlašćenje!')

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) return res.status(403).json('Nemate ovlašćenje!')

        const postId = req.params.id;
        const sql = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"

        db.query(sql, [postId, user.id], (err, result) => {
            if(err)
                return res.status(403).json("Možete obrisati samo svoj post!")
            return res.status(200).json('Post je uspješno obrisan!')
        })
    })
}
export const updatePost = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(403).json("Nemate ovlašćenje!");

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) return res.status(403).json('Nemate ovlašćenje!!');

        const postId = req.params.id;
        const sql = "UPDATE posts SET `title`= ?, `description`= ? `image`= ?, `category` = ? WHERE `id` = ? AND `uid` = ?"

        const values = [ req.body.title, req.body.description, req.body.image, req.body.category]

        db.query(sql, [...values, postId, user.id], (err, result) => {
            if(err) return res.status(500).json(err)
            return res.json("Vaš post je uspješno ažuriran!");
        })
    })
}