const { use } = require('../routes');
const UsersService = require ('../services/api_services');


module.exports = {
    getAll: async (req, res) => {
        let json = {erro: '', result: []};

        let user_id = req.params.user_id;
        let movements = await UsersService.getAllUserMovements(user_id);

        for (let i in movements){
            json.result.push({
                idmovements:movements[i].idmovements,
                title:movements[i].title,
                amount: movements[i].amount,
                date: movements[i].date,
                user_id: movements[i].user_id,
                type_id: movements[i].type_id               
            });
        }
        res.json(json);
    },

    getCurrentUserInfo: async (req, res) => {
        let json = {erro: '', result: []};

        let user_id = req.params.user_id;
        let user = await UsersService.getCurrentUserInfo(user_id);

        if(user){
            json.result = user;
        }

        res.json(json);
    },

    newUser: async (req, res) => {
        let json = {erro: '', result: []};

        let user_id = req.body.iduser;
        let email = req.body.email;
        let senha = req.body.senha_hash;
        let nome = req.body.nome;

        if(user_id && email && senha && nome){
            let newUser = await UsersService.newUser(user_id, email, senha, nome);
            
            json.result = {
                newUser,
                user_id,
                email,
                senha,
                nome
            }; 
        }else{
            json.erro = 'Campos não enviados';
        }

        res.json(json);
    },

    newMovement: async (req, res) => {
        let json = {erro: '', result: []};

        let title = req.body.title;
        let amount = req.body.amount;
        let user_id = req.body.user_id;
        let type_id = req.body.type_id;

        if(title && amount && user_id && type_id){
            let newMovement = await UsersService.newMovement(title, amount, user_id, type_id);
            
            json.result = {
                newMovement,
                title,
                amount,
                user_id,
                type_id
            }; 
        }else{
            json.erro = 'Campos não enviados';
        }

        res.json(json);
    },

    updateUser: async (req, res) => {
        let json = {erro: '', result: []};

        let user_id = req.params.user_id;
        let email = req.body.email;
        let senha = req.body.senha_hash;
        let nome = req.body.nome;

        if(user_id && email && senha && nome){
            await UsersService.updateUser(user_id, email, senha, nome);
                
            json.result = {
                user_id,
                email,
                senha,
                nome,
            }; 
        }else{
            json.erro = 'Campos não enviados';
        }

        res.json(json);
    },

    updateMovement: async (req, res) => {
        let json = {erro: '', result: []};
    
        let movement_id = req.params.movement_id;
        let title = req.body.title;
        let amount = req.body.amount;
        let type_id = req.body.type_id;
    
        if(movement_id && title && amount && type_id){
            await UsersService.updateMovement(movement_id, title, amount, type_id);
                
            json.result = {
                movement_id,
                title,
                amount,
                type_id,
            }; 
        }else{
            json.erro = 'Campos não enviados';
        }
    
        res.json(json);
    },

    deleteUser: async (req, res) => {
        let json = {erro: '', result: []};

        await UsersService.deleteUser(req.params.user_id);

        res.json(json);
    },

    deleteMovement: async (req, res) => {
        let json = {erro: '', result: []};

        await UsersService.deleteMovement(req.params.movement_id);

        res.json(json);
    }
    


}