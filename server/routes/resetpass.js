const router = require("express").Router();
const Joi = require("joi");
const crypto = require("crypto");
const { User } = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const passwordComplexity = require("joi-password-complexity");

router.post("/", async (req, res) => {
    try {
        // console.log("gello1")
        const pass = {password: req.body.password}
        const { error } = validate(pass);
        if(error)
        return res.status(400).send({ message: error.details[0].message });
        let user = await User.findOne({ _id: req.body.user_id });
        let strmail="Hello "+user.firstName+"\nYour password has been changed! If not done by you, Contact Us at support";
        await sendEmail(user.email, "Security Alert", strmail);
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
        await User.updateOne({ _id: req.body.user_id , password: hashPassword });
        return;
    }
    catch(error) {
        console.log(error);
    }
})

const validate = (data) => {
	const schema = Joi.object({
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;