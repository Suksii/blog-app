import { db } from '../db.js';
import jwt from 'jsonwebtoken';
export const updateUsername = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        if(!token) return res.status(403).json("Nemate ovlašćenje!");

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) return res.status(403).json('Nemate ovlašćenje!!');

            const {username, image} = req.body;
            if(!username) return res.status(400).json("Korisničko ime je obavezno!");

            const sql = "UPDATE user SET `username` = ?, `image` = ? WHERE `id` = ?"
            db.query(sql, [username, image, user.id], (err, result) => {
                if(err) return res.status(500).json(err)
                return res.json("Vaše korisničko ime je uspješno ažurirano!");
            })
        })
    } catch (error) {
    console.log(error)
    }
}