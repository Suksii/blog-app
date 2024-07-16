import mysql from 'mysql';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog_db'
})

db.connect((err) => {
    if(err)
        throw err;
    console.log('Connected to MySQL server');
})
