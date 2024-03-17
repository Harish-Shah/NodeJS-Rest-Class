let express = require('express');
let {registerUser,userLogin} = require("../controller/userController")

let router = express.Router();

router.post("/user/register",registerUser);
router.post("user/login",userLogin);

module.exports = router;