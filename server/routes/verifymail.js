const router = require("express").Router();
const Joi = require("joi");
const crypto = require("crypto");
const Token = require("../models/rptoken");
const { User } = require("../models/user");
const sendEmail = require("../utils/sendEmail");

router.post("/", async(req, res) => {
    try{
        const{ error } = validate(req.body);
        if(error)
        return res.status(400).send({ message: error.details[0].message });
        let user = await User.findOne({ email: req.body.email });
        if(user)
        {
            // console.log(user);
            const token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
            const url = `${process.env.BASE_URL}users/${user.id}/resetpass/${token.token}`;
            // console.log(token);
            await sendEmail(user.email, "Reset Password", url)
            // console.log(token);
        }
        else
        {
            res.send({message: "Invalid email! email not registered"});
        }
    }catch(er){
        res.status(500).send({ message: er });
    }
});

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
    });
    return schema.validate(data);
}

router.get("/:id/resetpass/:token/", async (req, res) => {
	try {
        // console.log("gello")
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link1" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link2" });

		await User.updateOne({ _id: user._id, verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });

	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports = router;