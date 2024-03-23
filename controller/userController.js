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
        let token = jwt.sign({ id: u.id, role: u.role }, "Secretkey_Anything", { expiresIn: "10h" })
        // resp.status(200).send(await user.findOne({ id: u.id }));
        resp.status(200).send({ token: token })
    }
}

let userLogin = async (req, resp) => {
    console.log("===>")
    let dbUser = await user.findOne({ id: req.body.id });
    let u = req.body;
    if (dbUser) {
        let isValidUser = await bcrypt.compare(u.password, dbUser.password);
        if (isValidUser) {
            //generate jwt token if password is Valid
            let token = jwt.sign({ id: dbUser.id, role: dbUser.role }, "Secretkey_Anything", { expiresIn: "10h" })
            resp.status(201).send({ token: token });
        } else {
            resp.status(401).send("User not Authenticated!Please check your credentials")
        }
    } else {
        resp.status(404).send("User Not Found!");
    }

}

module.exports = { registerUser, userLogin };