const db = require("../db");

module.exports ={
    getAllUserMovements: (user_id)=>{
        return new Promise((aceito, rejeitado) =>{
            db.query("SELECT * FROM movements WHERE user_id = ?", [user_id], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                } else {
                    aceito(results);
                }
            });
        });
    },

    getCurrentUserInfo: (user_id) =>{
        return new Promise((aceito, rejeito) => {
            db.query("SELECT * FROM users WHERE iduser = ?", [user_id], (error, results)=> {
                if (error){
                    rejeitado(error);
                    return;
                }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    newUser: (user_id, email, senha, nome)=>{
        return new Promise((aceito, rejeito) => {
            db.query(
                "INSERT INTO users (iduser, email, senha_hash, nome) VALUES (?, ?, ?, ?)", 
                [user_id, email, senha, nome], (error, results)=> {
                    if (error){
                        rejeitado(error);
                        return;
                    }
                    aceito(results.insertNewUser);
            });
        });
    },

    newMovement: (title, amount, user_id, type_id)=>{
        return new Promise((aceito, rejeito) => {
            db.query(
                "INSERT INTO movements (title, amount, user_id, type_id) VALUES (?, ?, ?, ?)", 
                [title, amount, user_id, type_id], (error, results)=> {
                    if (error){
                        rejeitado(error);
                        return;
                    }
                    aceito(results.insertNewMovement);
            });
        });
    },

    updateUser: (user_id, email, senha, nome)=>{
        return new Promise((aceito, rejeitado) => {
            db.query(
                "UPDATE users SET email = ?, senha_hash = ?, nome = ? WHERE iduser = ?", 
                [email, senha, nome, user_id], (error, results)=> {
                    if (error){
                        rejeitado(error);
                        return;
                    }
                    aceito(results);
            });
        });
    },

    updateMovement: (movement_id, title, amount, type_id)=>{
        return new Promise((aceito, rejeitado) => {
            db.query(
                "UPDATE movements SET title = ?, amount = ?, type_id = ? WHERE idmovements = ?", 
                [title, amount, type_id, movement_id], (error, results)=> {
                    if (error){
                        rejeitado(error);
                        return;
                    }
                    aceito(results);
            });
        });
    },

    deleteUser: (user_id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM users WHERE iduser = ?', [user_id], (error, results)=>{
                if (error){
                    rejeitado(error);
                    return;
                }
                aceito(results);
            });
        });
    },

    deleteMovement: (movement_id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM movements WHERE idmovements = ?', [movement_id], (error, results)=>{
                if (error){
                    rejeitado(error);
                    return;
                }
                aceito(results);
            });
        });
    },
};