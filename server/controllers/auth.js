import {db} from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    const sql = "SELECT * FROM user WHERE username = ? OR email = ?"
    db.query(sql, [req.body.username, req.body.email], (err, result) => {
        if(err)
            return res.json(err);
        if(result.length)
            return res.status(409).json("Korisnik već postoji!");
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const sql = "INSERT INTO user(`username`,`email`,`password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]

        db.query(sql, [values], (err, result) => {
            if(err)
                return res.json(err);
            return res.status(200).json("Korisnik je uspješno kreiran");
        })
    })
}


export const login = (req, res) => {
    const sql = "SELECT * FROM user WHERE email = ?"
    db.query(sql, [req.body.email], (err, result) => {
        if (err)
            return res.json(err)
        if(result.length === 0)
            return res.status(404).json("Korisnik ne postoji.")

        const isPasswordValid = bcrypt.compareSync(req.body.password, result[0].password)
        if(!isPasswordValid)
            return res.status(401).json("Pogrešna lozinka.")


        const token = jwt.sign({id: result[0].id}, process.env.SECRET_KEY, {expiresIn: "1h"})
        const {password, ...data} = result[0];

        res.cookie("accessToken", token, {
            httpOnly:true
        }).status(200).json(data)
    })
}

export const logout = (req, res) => {

    res.clearCookie('accessToken',
        {sameSite: 'none',
            secure: true
        }).status(200).json("Uspješno ste se odjavili.")
}