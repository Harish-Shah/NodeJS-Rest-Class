let user = require("../models/userModel");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

let registerUser = async (req, resp) => {

    let dbUser = await user.findOne({ id: req.body.id });

    if (dbUser) {
        resp.send("User already Exists!")
    } else {
        let u = req.body;
        // encrypting password
        u.password = await bcrypt.hash(u.password, 10);//10 reprsent the strong value
        await user.create(u);
        // generating jwt token
        let token = jwt.sign({ id: u.id }, "Secretkey_Anything", { expiresIn: "10h" })
        // resp.status(200).send(await user.findOne({ id: u.id }));
        resp.status(200).send({ token: token })
    }
}

let userLogin = async(req,resp) => {
    let dbUser = await user.findOne({id:req.body.id});
    let u = req.body;

    if(dbUser){
        let isValidUser = await bcrypt.compare(u.password,dbUser.password);
        if(isValidUser){
            let token = jwt.sign({ id: dbUser.id }, "Secretkey_Anything", { expiresIn: "10h" })
            resp.status(200).send({ token: token })
        }else{
            resp.status(401).send("User not Authenticated!")
        }
    }else{
        resp.status(404).send("User not found!")
    }
    
}

module.exports = { registerUser,userLogin };