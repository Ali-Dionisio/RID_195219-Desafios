import db from "../config/database.js";

db.run(`
    CREATE TABLE IF NOT EXISTS cliente (
    id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_completo TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL

    )    
`)

function createUserRepository(newUser) {
    return new Promise((resolve, reject) => {
        const {nome_completo, email, password} = newUser;
        db.run(`
            INSERT INTO cliente (nome_completo, email, password)
            VALUES (?, ?, ?)   
        `,
        [nome_completo, email, password],
        function (err) {
            if(err) {
                reject(err);
            } else {
                resolve({id: this.lastID, ...newUser})
            }
        }
        );
    });
}
function findUserByEmailRepository(email){
    return new Promise((resolve, reject) => {
        db.get(`
            SELECT id_cliente, nome_completo, email, password
            FROM cliente
            WHERE email = ?
        `, [email], 
           (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        })
    }) 
}

function findUserByIdRepository(id){
    return new Promise((resolve, reject) => {
        db.get(`
            SELECT id_cliente, nome_completo, email, password
            FROM cliente
            WHERE id_cliente = ?
        `, [id], 
           (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        })
    }) 
}

function findAllUserRepository(){
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT id_cliente, nome_completo, email
            FROM cliente
            `, 
            [], 
           (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        })
    }) 
}

function updateUserRepository(id, user){
    return new Promise((resolve, reject) => {
        const fields = ['nome_completo','email','password'];
        let query = 'UPDATE cliente SET'
        const values = []
        
        fields.forEach((field) => {
            if(user[field] !== undefined) {
                query += ` ${field} = ?,`
                values.push(user[field])
            }
        })
        query = query.slice(0, -1)

        query += ' WHERE id_cliente = ?';
        values.push(id)

        console.log(`Query: ${query}`)
        console.log(`Values: ${values}`)

        db.run(query, values, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({...user, id});
            }
        })
    }) 
}
/*
function updateUserRepository(id, user){
    return new Promise((resolve, reject) => {
        const {username, email, password, avatar} = user
        db.run(`
            UPDATE users SET
              username = ?, 
              email = ?, 
              password = ?, 
              avatar = ? 
            WHERE id = ?
        `, [username, email, password, avatar, id], 
           (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({id, ...user});
            }
        })
    }) 
}
*/
async function deleteUserRepository(id){
    return new Promise ((resolve, reject) => {
        db.run(`
         DELETE FROM cliente
         WHERE  id_cliente = ?
     `,[id], 
     (err) => {
      if(err) {
        reject(err)
      } else {
        resolve({message: "User delete ", id})
      }
    })
  })
}
export default {
    createUserRepository,
    findUserByEmailRepository,
    findUserByIdRepository,
    findAllUserRepository,
    updateUserRepository,
    deleteUserRepository
}